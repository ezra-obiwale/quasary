<template>
  <FormElement
    ref="FormElement"
    tag="q-select"
    :clearable="!multiple && clearable"
    :display-value-sanitize="!htmlOptions"
    :emit-value="emitValue"
    :map-options="emitValue"
    :multiple="multiple"
    :new-value-mode="newValueMode"
    :option-label="optionLabel"
    :options-sanitize="!htmlOptions"
    :options-selected-class="!showSelectedOption ? 'hidden' : ''"
    :use-chips="multiple"
    :use-input="!!newValueMode"
    :value="value"
    v-bind="$attrs"
    v-on="$listeners"
    @blur="movedAway"
  >
    <slot />

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
  </FormElement>
</template>

<script>
import FormElement from './FormElement'

export default {
  name: 'SelectComponent',
  components: { FormElement },
  props: {
    clearable: {
      type: Boolean,
      default: false
    },
    emitValue: {
      type: Boolean,
      default: false
    },
    htmlOptions: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    newValueMode: {
      type: String
    },
    optionLabel: {
      type: String
    },
    showSelectedOption: {
      type: Boolean,
      default: false
    },
    value: {}
  },
  data () {
    return {
      usedSlots: ['default']
    }
  },
  methods: {
    isSelectedValue(val) {
      let optionLabel = this.value

      if (!this.emitValue && !!this.value && typeof this.value === 'object') {
        optionLabel = this.optionLabel ? this.value[this.optionLabel] : this.value.value
      }

      return val === optionLabel
    },
    movedAway (event) {
      if (!this.newValueMode) {
        return
      }

      const typedText = (event.target || {}).value

      if (!typedText || this.isSelectedValue(typedText)) {
        return
      }

      const QSelect = this.$refs.FormElement.$refs.Element.$refs.component

      QSelect.add(typedText, true)
    }
  }
}
</script>

<style>
</style>
