<template>
  <q-table ref="QTable" :grid="isMobile" :columns="allColumns" v-bind="$attrs" v-on="$listeners">
    <template #body-cell-serial="{ row }">
      <q-td>
      {{ row.__index + 1 }}
      </q-td>
    </template>
    <template v-for="(slot, key) in $slots" :slot="key">
      <slot :name="key" />
    </template>
    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope" />
    </template>
  </q-table>
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
      return this.$refs.table.requestServerInteraction()
    }
  }
}
</script>

<style>
</style>
