<template>
  <q-table :color="color" :selection="selection" v-bind="$attrs" v-on="$listeners" class="panel-def border-round">
    <template slot="top-selection" slot-scope="props">
      <slot name="table-selection-panel" v-bind="props"/>
    </template>
    <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
      <slot name="table-pagination" v-bind="props" />
    </div>
    <q-tr class="cuz" slot="header" slot-scope="props" :props="props">
      <q-th v-if="selection !== 'none'" auto-width>
        <q-checkbox
          :color="color"
          v-if="props.multipleSelect"
          v-model="props.selected"
          indeterminate-value="some" />
      </q-th>
      <th v-if="serialNumber" class="text-right">
        S/N
      </th>
      <q-th v-for="col in props.cols" :key="col.name" :props="props">
        {{ col.label }}
      </q-th>
      <q-th />
    </q-tr>
    <template slot="body" slot-scope="props">
      <q-tr class="cuz" :props="props" @click.native="props.expand = !props.expand">
        <q-td v-if="selection !== 'none'" auto-width>
          <q-checkbox :color="color" v-model="props.selected" />
        </q-td>
        <q-td v-if="serialNumber" auto-width>
          {{ props.row.__index + 1 }}
        </q-td>
        <template v-for="(column, index) in props.cols">
          <q-td v-if="colSpan(props.cols[index], props.row)"
            :key="column.name"
            :colspan="colSpan(props.cols[index], props.row)"
            :rowspan="rowSpan(props.cols[index], props.row)"
            :props="props">
            <table-cell
              :col="props.cols[index]"
              :field="props.cols[index].field"
              :row="props.row" />
          </q-td>
        </template>
        <q-td v-if="actionDropdown" key="--actions" class="btn-tb">
          <table-row-actions
            :actions="rowAction(props.row)"
            :row="props.row"
            :dropdown="actionDropdown" />
        </q-td>
      </q-tr>
      <q-tr class="inner-tb" v-for="(child, index) in rowChildren(props.row)"
        :key="`${props.row.id}-${index}`"
        v-show="props.expand"
        :props="props">
        <q-td v-if="selection !== 'none'" auto-width>
          &nbsp;
        </q-td>
        <q-td v-if="serialNumber" auto-width>
          &nbsp;
        </q-td>
        <template v-for="(column, index) in props.cols">
          <q-td v-if="colSpan(props.cols[index], props.row, child)"
            :key="column.name"
            :props="props"
            :colspan="colSpan(props.cols[index], props.row, child)"
            :rowspan="rowSpan(props.cols[index], props.row, child)">
            <table-cell
              :col="props.cols[index]"
              :field="props.cols[index].field"
              :child="child"
              :row="props.row" />
          </q-td>
        </template>
        <q-td v-if="actionDropdown" key="--actions" class="btn-tb">
          <table-row-actions
            :actions="rowAction(props.row, child)"
            :row="child"
            :dropdown="actionDropdown" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'AppTable',
  props: {
    actionDropdown: {
      type: [Boolean, Object],
      default: false
    },
    color: {
      type: String,
      default: 'none'
    },
    rowActions: {
      type: [Array, Function],
      default: function () {
        return []
      }
    },
    rowChildren: {
      type: Function,
      default: function() {
        return () => { return [] }
      }
    },
    selection: {
      type: String,
      default: 'multiple'
    },
    serialNumber: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TableCell: () => import('./TableCell.vue'),
    TableRowActions: () => import('./TableRowActions.vue')
  },
  methods: {
    colSpan (column, row, child) {
      let span = column.colSpan
      if (typeof span == 'function') {
        span = span(row, child)
      }
      return typeof span == 'number' ? span : 1
    },
    rowAction (row, child) {
      let actions = []
      if (Array.isArray(this.rowActions)) {
        actions = this.rowActions
      } else if (typeof this.rowActions == 'function') {
        actions = this.rowActions(...arguments)
      }

      return actions
    },
    rowHasChildren(row) {
      let children = this.rowChildren(row)
      return Array.isArray(children) && children.length
    },
    rowSpan (column, row, child) {
      let span = column.rowSpan
      if (typeof span == 'function') {
        span = span(row, child)
      }
      return typeof span == 'number' ? span : 1
    }
  }
}
</script>

<style scoped>
  .inner-tb{
    background: #e8f5e9!important;
    border-left: 5px solid #199eb5;
  }

  .inner-tb td{
    border-width: 0 0 0px 0!important
  }

  .cuz :hover{
    cursor: pointer!important;
  }
</style>
