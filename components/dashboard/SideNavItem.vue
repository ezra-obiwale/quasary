<template>
  <q-item
    clickable
    tag="a"
    :to="path"
    :active="isActive"
    active-class="bg-primary-600"
  >
    <q-item-section v-if="!isChild && icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label v-if="subLabel" caption>{{ subLabel }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'SideNavItemComponent',
  props: {
    icon: {
      type: String,
      default: ''
    },
    isChild: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    activeIf: {
      type: Function
    },
    path: {
      type: String,
      required: true
    },
    subLabel: {
      type: String,
      default: ''
    }
  },
  computed: {
    isActive () {
      return this.activeIf ? this.activeIf(this.$route) : this.$route.path.startsWith(this.path)
    }
  }
}
</script>

<style>
</style>
