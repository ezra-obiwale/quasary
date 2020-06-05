<template>
  <FormElement
    ref="FormElement"
    tag="q-select"
    :clearable="!multiple && clearable"
    :emit-value="emitValue"
    :map-options="emitValue"
    :multiple="multiple"
    :use-chips="multiple"
    :display-value-sanitize="!htmlOptions"
    :options-sanitize="!htmlOptions"
    :options-selected-class="!showSelectedOption ? 'hidden' : ''"
    v-bind="$attrs"
    v-on="$listeners"
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
    showSelectedOption: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      usedSlots: ['default']
    }
  }
}
</script>

<style>
</style>
