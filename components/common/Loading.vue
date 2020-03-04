<template>
  <q-inner-loading ref="QInnerLoading" :color="color" :size="size" v-bind="$attrs">
    <q-spinner-rings :size="size" :color="color" />
    <template v-for="(slot, key) in $slots" :slot="key">
      <slot :name="key" />
    </template>
    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope" />
    </template>
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
