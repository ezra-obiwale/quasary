<template>
  <app-element ref="Element" v-model="model" v-bind="attrs" v-on="$listeners">
    <template v-for="(slot, key) in $slots" :slot="key">
      <slot :name="key" />
    </template>
    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope" />
    </template>
  </app-element>
</template>

<script>
import attrs from '../../mixins/FormElement'

export default {
  name: 'FormElementComponent',
  mixins: [attrs]
}
</script>

<style>
</style>
