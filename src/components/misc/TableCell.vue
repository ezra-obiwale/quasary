<template>
  <div>
    <template v-if="typeof field == 'function'">
      <component v-if="typeof fieldValue == 'object'"
        :is="fieldValue.name"
        v-bind="fieldValue.attributes || {}"
        v-on="fieldValue.events || {}" />
      <div v-else class="row inline" v-html="fieldValue" />
    </template>
    <template v-else>
      <div v-html="row[field]" class="row inline" />
    </template>
  </div>
</template>

<script>
export default {
    name: 'TableCell',
    props: {
        checkbox: {
          type: [Boolean, Object],
          default: false
        },
        child: {
          type: Object,
          default: function() {
            return null
          }
        },
        col: {
          type: Object,
          required: true
        },
        field: {
          type: [String, Function],
          required: true
        },
        row: {
          type: Object,
          required: true
        }
    },
    inheritAttrs: false,
    computed: {
      fieldValue () {
        return this.field(this.row, this.child)
      }
    }
}
</script>
