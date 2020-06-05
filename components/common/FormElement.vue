<template>
  <Element
    ref="Element"
    v-model="model"
    v-bind="attrs"
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
  </Element>
</template>

<script>
import attrs from '../mixins/FormElement'
import Element from './Element'

export default {
  name: 'FormElementComponent',
  mixins: [attrs],
  components: { Element },
  data () {
    return {
      usedSlots: ['default']
    }
  }
}
</script>

<style>
</style>
