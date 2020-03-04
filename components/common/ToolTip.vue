<template>
  <q-tooltip
    :anchor="anchor"
    :self="self"
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
  </q-tooltip>
</template>

<script>
export default {
  name: 'ToolTipComponent',
  props: {
    bottom: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: true
    },
    right: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      usedSlots: ['default']
    }
  },
  computed: {
    anchor () {
      if (this.bottom) {
        return 'bottom middle'
      } else if (this.right) {
        return 'center right'
      } else if (this.top) {
        return 'top middle'
      }
      return 'center left'
    },
    self () {
      if (this.bottom) {
        return 'top middle'
      } else if (this.right) {
        return 'center left'
      } else if (this.top) {
        return 'bottom middle'
      }
      return 'center right'
    }
  }
}
</script>

<style>
</style>
