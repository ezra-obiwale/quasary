<template>
  <QDialog
    ref="QDialog"
    auto-close
    v-model="model"
  >
    <QList
      ref="QList"
      bordered
      separator
      padding
      class="bg-white full-width q-py-none"
    >
      <slot />
    </QList>
  </QDialog>
</template>

<script>
export default {
  name: 'MobileMenuComponent',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    model: {
      set (value) {
        this.$emit('input', value)
      },
      get () {
        return this.value
      }
    }
  }
}
</script>

<style>
</style>
