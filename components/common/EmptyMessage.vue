<template>
  <div class="text-center text-weight-light" :style="`margin-top: ${margins || topMargin}; margin-bottom: ${margins || bottomMargin}`">
    <q-icon :name="icon" color="grey" :size="size" class="q-mb-lg" />
    <br />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'EmptyMessageComponent',
  props: {
    bottomMargin: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'layers_clear'
    },
    margins: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '100px'
    },
    topMargin: {
      type: String,
      default: '20vh'
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
