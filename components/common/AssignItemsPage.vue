<template>
  <relations-page
    ref="relations"
    :title="`Assign ${assignAlias || assign} ${assigneeName ? `to ${assigneeName}` : ''} `"
    :collection="assign"
    :query="itemsQuery"
    :items-type="itemsAlias || items"
    :removed-items="removed"
    :save-fn="save"
    :selection-component="selectionComponent"
    :selection-component-attrs="selectionComponentAttrs"
    watch-items
    @itemsUpdated="gotItems"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #each-item-content="{ index, item, items }">
      <q-item-section v-html="getItemName(item)" />
      <q-item-section side>
        <q-btn
          icon="delete"
          color="negative"
          flat
          round
          @click="removeItem(index, items)"
        />
      </q-item-section>
    </template>
    <template #no-items-message>
      No {{ assign }} have been assigned yet
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
  </relations-page>
</template>

<script>
export default {
  name: 'AssignItemsPageComponent',
  props: {
    assign: {
      type: String,
      required: true
    },
    assignAlias: {
      type: String,
      default: ''
    },
    assigneeId: {
      type: String,
      required: true
    },
    assignLabelField: {
      type: [String, Function],
      default: 'name'
    },
    itemLabelField: {
      type: [String, Function],
      default: 'name'
    },
    items: {
      type: String,
      required: true
    },
    itemsAlias: {
      type: String,
      default: ''
    },
    itemsOnly: {
      type: Boolean,
      default: false
    },
    selectionComponent: {
      type: [Object, String],
      required: true
    },
    selectionComponentAttrs: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    let itemsQuery = {}
    itemsQuery[this.itemsAlias || this.items] = this.assigneeId
    return {
      assignee: {},
      itemsQuery: { ...itemsQuery, ...(this.selectionComponentAttrs.query || {}) },
      relationsItems: [],
      removed: [],
      usedSlots: ['default', 'eachItemContent', 'noItemsMessage']
    }
  },
  computed: {
    assigneeName () {
      return this.getFrom(this.assignee, this.assignLabelField) || ''
    },
    capitalizedAssign () {
      const assign = this.assignAlias || this.assign
      return assign[0].toUpperCase() + assign.substr(1)
    }
  },
  created () {
    this.tryCatch(async () => {
      const assignee = (await this.$server.connect(this.items).get(this.assigneeId)).data
      if (assignee && assignee.branchId === this.currentBranch.id) {
        this.$set(this, 'assignee', assignee)
        this.$emit('gotAssignee', this.assignee)
      }
    })
  },
  methods: {
    getFrom (obj, field) {
      if (typeof field === 'function') {
        return field(obj)
      } else {
        return obj[field]
      }
    },
    getItemName (item) {
      return this.getFrom(item, this.itemLabelField)
    },
    gotItems (items) {
      this.relationsItems = items
    },
    removeItem (index, items) {
      this.removed.push(items[index].id)
      items.splice(index, 1)
    },
    async save (items) {
      await this.tryCatch(async () => {
        const itemIds = items.map(item => item.id)
        let data = {
          base: {
            collection: this.items,
            value: this.assigneeId,
            field: this.itemsAlias || this.items
          },
          removed: this.removed,
          $limitRecursion: (itemIds.length + this.removed.length) * 4
        }
        if (!this.itemsOnly) {
          data.and = {
            collection: this.assign,
            value: itemIds,
            field: this.assignAlias || this.assign
          }
        }
        await this.$server.connect('relationships/associate').post(data)
        this.notify(`${this.capitalizedAssign} assigned successfully`)
        this.removed = []
      })
    }
  }
}
</script>

<style>
</style>
