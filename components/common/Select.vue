<template>
  <form-element ref="FormElement" tag="q-select" :emit-value="emitValue" :map-options="emitValue" :multiple="multiple" :use-chips="multiple" :display-value-sanitize="!htmlOptions" :options-sanitize="!htmlOptions" :options-selected-class="!showSelectedOption ? 'hidden' : ''" v-bind="$attrs" v-on="$listeners">
    <template v-for="(slot, key) in $slots" :slot="key">
      <slot :name="key" />
    </template>
    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope" />
    </template>
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
