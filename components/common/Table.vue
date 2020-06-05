<template>
  <QTable
    ref="QTable"
    :grid="isMobile"
    :columns="allColumns"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #body-cell-serial="{ row }">
      <QTd>
        {{ row.__index + 1 }}
      </QTd>
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
  </QTable>
</template>

<script>
export default {
  name: 'TableComponent',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    serialNumber: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      usedSlots: ['default', 'bodyCellSerial']
    }
  },
  computed: {
    allColumns () {
      if (!this.serialNumber) {
        return this.columns
      }
      return [
        {
          name: 'serial',
          label: typeof this.serialNumber === 'string' ? this.serialNumber : 'S / N',
          align: 'left',
          sortable: true
        },
        ...this.columns
      ]
    }
  },
  methods: {
    load () {
      return this.$refs.QTable.requestServerInteraction()
    }
  }
}
</script>

<style>
</style>
