<template>
  <vd-form-fields
    row-class="row gutter-xs"
    column-class="col-12"
    :fields="fields"
    v-bind="$attrs"
    v-on="$listeners"
    v-model="model"
    ref="vdFormFields">
    <template slot="field"
      slot-scope="{ field, data, error, events }">
      <q-field
        v-if="field.QField === true || (field.QField !== false && !$q.platform.is.mobile)"
        :error="error"
        v-bind="field.attributes" >
        <vd-form-field
          :id="field.name"
          :name="field.element.name"
          :default-value="field.element.defaultValue"
          :error="error"
          :class="fieldClass(field)"
          inverted-light
          v-bind="field.element.attributes || {}"
          :value="deepValue(data, field.name, deepValue(data, field.dataKey))"
          v-on="events" />
        <input
          v-if="field.formFriendly"
          type="hidden"
          :name="cleanName(field)"
          :value="cleanValue(deepValue(data, field.name, deepValue(data, field.dataKey)))" />
      </q-field>
      <template v-else>
        <vd-form-field
          :id="field.name"
          :name="field.element.name"
          :default-value="field.element.defaultValue"
          :error="error"
          :class="fieldClass(field)"
          :inverted-light="!$q.platform.is.mobile"
          v-bind="field.element.attributes || {}"
          :value="deepValue(data, field.name, deepValue(data, field.dataKey))"
          v-on="events" />
        <input
          v-if="field.formFriendly"
          type="hidden"
          :name="cleanName(field)"
          :value="cleanValue(deepValue(data, field.name, deepValue(data, field.dataKey)))" />
      </template>
    </template>
  </vd-form-fields>
</template>
<script>
export default {
  name: 'FormFields',
  props: {
    fields: {
      type: Array,
      default: function () {
        return []
      }
    },
    value: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  inheritAttrs: false,
  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('change', value)
        this.$emit('input', value)
      }
    }
  },
  methods: {
    cleanName (field) {
      if (!this.$refs.vdFormFields) {
        return 'loading'
      }
      return this.$refs.vdFormFields.cleanName(field)
    },
    cleanValue (value) {
      if (value === true) {
        value = 1
      } else if (value === false) {
        value = 0
      }
      return value
    },
    fieldClass (field) {
      if (field.element.class !== undefined) {
        return field.element.class
      }
      return ''
    }
  }
}
</script>
