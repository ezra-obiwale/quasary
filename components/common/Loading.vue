<template>
  <q-inner-loading ref="QInnerLoading" :color="color" :size="size" v-bind="$attrs">
    <q-spinner-rings :size="size" :color="color" />
  </q-inner-loading>
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
  }
}
</script>

<style>
</style>
