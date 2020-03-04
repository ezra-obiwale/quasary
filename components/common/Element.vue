<template>
  <component
    :is="tag"
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
  </component>
</template>

<script>
export default {
  name: 'ElementComponent',
  props: {
    tag: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      usedSlots: ['default']
    }
  }
}
</script>
