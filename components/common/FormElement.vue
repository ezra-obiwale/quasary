<template>
  <app-element
    ref="Element"
    v-model="model"
    v-bind="attrs"
    v-on="$listeners"
  >
    <slot />

    <template
      v-for="(fn, key) in $slots"
      :slot="key"
    >
      <slot
        v-if="!usedSlots.includes(key)"
        :name="key"
      />
    </template>
    <template
      v-for="(fn, key) in $scopedSlots"
      :slot="key"
      slot-scope="scope"
    >
      <slot
        v-if="!usedSlots.includes(key)"
        :name="key"
        v-bind="scope"
      />
    </template>
  </app-element>
</template>

<script>
import attrs from '../mixins/FormElement'

export default {
  name: 'FormElementComponent',
  mixins: [attrs],
  data () {
    return {
      usedSlots: ['default']
    }
  }
}
</script>

<style>
</style>
