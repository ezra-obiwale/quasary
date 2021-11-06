<template>
  <div>
    <QToolbar>
      <QToolbarTitle v-if="label">{{ label }}</QToolbarTitle>
      <QSpace />
      <QBtn
        color="primary"
        icon="add"
        @click="$emit('add')"
        flat
        round
      />
    </QToolbar>

    <div
      class="relative-position"
      v-for="(field, index) in fields"
      :key="`field_${index}`"
    >
      <slot
        :field="field"
        :index="index"
      />
      <QBtn
        v-if="canRemove"
        icon="close"
        class="absolute-bottom-right"
        color="negative"
        size="sm"
        @click="$emit('remove', index)"
        round
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiField',
  props: {
    canRemoveAll: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Array,
      default: () => []
    },
    label: {
      type: String
    }
  },
  computed: {
    canRemove () {
      return this.canRemoveAll || this.fields.length > 1
    }
  }
}
</script>
