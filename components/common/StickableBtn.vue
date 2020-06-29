<template>
  <Button
    ref="Button"
    v-if="$q.screen.gt.sm || nonSticky"
    :label="label"
    :icon="icon"
    v-bind="$attrs"
    v-on="$listeners"
  />

  <QPageSticky
    ref="QPageSticky"
    v-else
    style="z-index: 9"
    position="bottom-right"
    :offset="[18, 18]"
  >
    <Button
      ref="Button"
      fab
      :icon="mobileIcon || icon"
      regular
      v-bind="$attrs"
      v-on="$listeners"
    />
  </QPageSticky>
</template>

<script>
import Button from './Button'

export default {
  name: 'StickableBtnComponent',
  components: { Button },
  props: {
    icon: {
      type: String
    },
    label: {
      type: String,
      default: 'Click'
    },
    mobileIcon: {
      type: String
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
