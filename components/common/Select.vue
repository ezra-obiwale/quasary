<template>
  <form-element ref="FormElement" tag="q-select" :emit-value="emitValue" :map-options="emitValue" :multiple="multiple" :use-chips="multiple" :display-value-sanitize="!htmlOptions" :options-sanitize="!htmlOptions" :options-selected-class="!showSelectedOption ? 'hidden' : ''" v-bind="$attrs" v-on="$listeners">
    <slot />
    <slot name="hint" slot="hint" />
  </form-element>
</template>

<script>
export default {
  name: 'SelectComponent',
  props: {
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
  }
}
</script>

<style>
</style>
