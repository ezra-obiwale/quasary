<template>
  <q-table ref="table" :grid="isMobile" :columns="allColumns" v-bind="$attrs" v-on="$listeners">
    <template #body-cell-serial="{ row }">
      <q-td>
      {{ row.__index + 1 }}
      </q-td>
    </template>
    <template v-for="(fn, slot) in $scopedSlots" :slot="slot" slot-scope="scope">
      <slot :name="slot" v-bind="scope" />
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
