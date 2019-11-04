<template>
  <app-btn v-if="$q.screen.gt.sm || nonSticky" :label="label" :icon="icon" v-bind="$attrs" v-on="$listeners" />
  <q-page-sticky v-else style="z-index: 9" position="bottom-right" :offset="[18, 18]">
    <app-btn fab :icon="mobileIcon || icon" regular v-bind="$attrs" v-on="$listeners" />
  </q-page-sticky>
</template>

<script>
export default {
  name: 'StickableBtnComponent',
  props: {
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Click'
    },
    mobileIcon: {
      type: String,
      default: ''
    },
    nonSticky: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
</style>
