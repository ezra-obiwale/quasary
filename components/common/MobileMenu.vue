<template>
  <q-dialog auto-close v-model="model">
    <q-list bordered separator padding class="bg-white full-width q-py-none">
      <slot />
    </q-list>
  </q-dialog>
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
