<template>
  <QItem
    clickable
    tag="a"
    :to="path"
    :active="isActive"
    :active-class="activeClass"
    @click="handler"
  >
    <QItemSection v-if="!isChild && icon" avatar>
      <QIcon :name="icon" />
    </QItemSection>

    <QItemSection>
      <QItemLabel>{{ label }}</QItemLabel>
      <QItemLabel v-if="subLabel" caption>{{ subLabel }}</QItemLabel>
    </QItemSection>
  </QItem>
</template>

<script>
export default {
  name: 'SideNavItemComponent',
  props: {
    activeClass: {
      type: String,
      default: 'bg-primary-600'
    },
    handler: {
      type: Function,
      default: () => () => {}
    },
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
      type: String
    },
    subLabel: {
      type: String,
      default: ''
    }
  },
  computed: {
    isActive () {
      return this.activeIf
        ? this.activeIf(this.$route)
        : this.$route.path.startsWith(this.path)
    }
  }
}
</script>

<style></style>
