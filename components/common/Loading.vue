<template>
  <QInnerLoading
    ref="QInnerLoading"
    :color="color"
    :size="size"
    v-bind="$attrs"
  >
    <QSpinnerRings
      :size="size"
      :color="color"
    />

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
  </QInnerLoading>
</template>

<script>
export default {
  name: 'LoadingComponent',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: '150px'
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
