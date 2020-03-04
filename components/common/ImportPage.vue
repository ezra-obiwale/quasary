<template>
  <app-page
    ref="Page"
    can-go-back
    no-create-btn
    full-width
    no-infinite-scroll
    no-pull-to-refresh
    :title="`Import ${capitalizedItem}`"
    :icon="icon"
    :working="working"
  >
    <template
      v-if="templateUrl || fileAdded"
      #page-desktop-buttons
    >
      <q-btn
        :disabled="fileAdded && !canSave"
        :label="btnLabel"
        :icon="btnIcon"
        class="float-right"
        color="primary"
        @click="btnClicked"
      />
    </template>
    <template
      v-if="templateUrl || fileAdded"
      #page-mobile-buttons
    >
      <q-btn
        :disabled="fileAdded && !canSave"
        fab
        :icon="btnIcon"
        class="float-right"
        color="primary"
        @click="btnClicked"
      >
        <tool-tip>{{ btnLabel }}</tool-tip>
      </q-btn>
    </template>
    <template>
      <slot name="before-uploader" />
      <app-uploader
        ref="uploader"
        :factory="uploadFactory"
        accept=".xls,.xlsx,.csv"
        label="Select File"
        :url="uploadUrl"
        v-bind="$attrs"
        @added="process"
        @removed="clear"
        @start="working = true"
        @finish="working = false"
        @uploaded="success"
        @failed="failed"
      />
      <slot name="before-table" />
      <q-card
        class="q-mt-md"
        v-if="Object.keys(mapFields).length && rows.length"
      >
        <q-card-section>
          <label style="color: inherit">
            <q-toggle
              type="checkbox"
              name="ignore_first_row"
              value="1"
              v-model="skipFirstRow"
            />
            First row is NOT data
          </label>
        </q-card-section>
        <q-markup-table>
          <thead>
            <tr>
              <th
                v-for="(column, index) in rows[0]"
                :key="`column-${index}`"
              >
                <app-select
                  :value="columnMaps[index]"
                  :options="createMapOptions(index)"
                  @input="map(index, $event)"
                  emit-value
                  map-options
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, rowIndex) in rows"
              :key="`row-${rowIndex}`"
            >
              <td
                v-for="(col, colIndex) in row"
                :key="`row-${rowIndex}-column-${colIndex}`"
              >{{ col }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card>
      <slot name="after-table" />
    </template>

    <template
      v-for="(fn, key) in $slots"
      :slot="usedSlots.includes(key) ? undefined : key"
    >
      <slot
        v-if="!usedSlots.includes(key)"
        :name="key"
      />
    </template>
    <template
      v-for="(fn, key) in $scopedSlots"
      :slot="usedSlots.includes(key) ? undefined : key"
      slot-scope="scope"
    >
      <slot
        v-if="!usedSlots.includes(key)"
        :name="key"
        v-bind="scope"
      />
    </template>
  </app-page>
</template>

<script>
import importMixin from '../mixins/Importing'

export default {
  name: 'ImportPageComponent',
  mixins: [importMixin],
  props: {
    additionalData: {
      type: Object,
      default: () => ({})
    },
    collection: {
      type: String,
      required: true
    },
    formFields: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      default: ''
    },
    item: {
      type: String,
      required: true
    },
    mapFields: {
      type: Array,
      default: () => []
    },
    maxShownRows: {
      type: Number,
      default: 3
    },
    realCollection: {
      type: String,
      default: ''
    },
    templateUrl: {
      type: String,
      default: ''
    },
    uploadUrl: {
      type: String,
      default: '/imports'
    }
  },
  data () {
    return {
      canSave: false,
      columnMaps: {},
      fileAdded: false,
      skipFirstRow: true,
      mappings: {},
      rows: [],
      usedSlots: ['default', 'page-desktop-buttons', 'page-mobile-buttons', 'before-uploader', 'before-table', 'after-table'],
      working: false
    }
  },
  computed: {
    btnIcon () {
      return this.fileAdded ? 'check' : 'file_download'
    },
    btnLabel () {
      return this.fileAdded ? 'Upload' : 'Download Template'
    },
    capitalizedItem () {
      return this.item[0].toUpperCase() + this.item.substr(1)
    }
  },
  watch: {
    mappings: {
      deep: true,
      handler () {
        let canSave = true
        for (let i = 0; i < this.mapFields.length; i++) {
          const { value, required } = this.mapFields[i]

          if (required && this.mappings[value] === null) {
            canSave = false
            break
          }
        }
        this.canSave = canSave
      }
    },
    rows: {
      deep: true,
      handler (rows) {
        if (!rows.length) {
          this.$set(this, 'columnMaps', {})
        } else {
          let len = rows[0].length
          while (len >= 0) {
            this.$set(this.columnMaps, len, 'skip')
            len--
          }
        }
      }
    }
  },
  created () {
    this.setupMappings()
  },
  methods: {
    btnClicked () {
      if (this.fileAdded) {
        if (this.canSave) {
          return this.$refs.uploader.upload()
        }
      } else {
        window.open(this.templateUrl)
      }
    },
    clear () {
      this.fileAdded = false
      this.rows = []
      this.skipFirstRow = true
      this.setupMappings()
    },
    createMapOptions (index) {
      const options = []
      if (this.columnMaps[index] !== 'skip') {
        options.push({ label: 'Skip', value: 'skip' })
      }
      this.mapFields.forEach(option => {
        const map = this.mappings[option.value]
        // show option if selected field is 'skip'
        // or not selected in another field
        // or if selected, this is the field
        if (map === null || map === index) {
          options.push(option)
        }
      })
      return options
    },
    failed () {
      this.notify('Upload failed', 'negative')
    },
    map (index, value) {
      // reset old value
      if (this.columnMaps[index] !== 'skip') {
        this.$set(this.mappings, this.columnMaps[index], null)
      }
      if (value !== 'skip') {
        this.$set(this.mappings, value, index)
      }
      this.$set(this.columnMaps, index, value)
    },
    process (files) {
      this.processFile(files)
        .then(data => {
          this.fileAdded = true
          this.processExcel(data)
        })
        .catch(e => this.notify(e.message, 'negative'))
    },
    processExcel (data) {
      this.$set(this, 'rows', this.getExcelRows(data, this.maxShownRows))
    },
    setupMappings () {
      this.mapFields.forEach(({ value }) => {
        this.$set(this.mappings, value, null)
      })
    },
    success () {
      this.notify('The file is being imported in the background')
      this.clear()
      this.$refs.uploader.reset()
    },
    uploadFactory () {
      return {
        formFields: [
          ...this.formFields,
          { name: 'collection', value: this.collection },
          { name: 'realCollection', value: this.realCollection },
          { name: 'mappings', value: JSON.stringify(this.mappings) },
          { name: 'skipFirstRow', value: this.skipFirstRow ? 1 : 0 },
          { name: 'additionalData', value: JSON.stringify(this.additionalData) }
        ]
      }
    }
  }
}
</script>

<style>
</style>
