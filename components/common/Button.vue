<template>
  <q-btn ref="QBtn" :loading="loading" :disabled="loading" :color="color" :class="{ 'full-width' : !regular }" :size="actualSize" v-bind="$attrs" v-on="$listeners">
    <template #loading>
      <q-spinner-rings />
    </template>
    <tool-tip v-if="tooltip" :left="tooltipLeft" :right="tooltipRight" :bottom="tooltipBottom" :top="tooltipTop">{{ tooltip }}</tool-tip>
    <template v-for="(slot, key) in $slots" :slot="key">
      <slot :name="key" />
    </template>
    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope" />
    </template>
  </q-btn>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    loading: {
      type: Boolean,
      default: false
    },
    regular: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'auto'
    },
    tooltip: {
      type: String,
      default: ''
    },
    tooltipBottom: {
      type: Boolean,
      default: false
    },
    tooltipLeft: {
      type: Boolean,
      default: false
    },
    tooltipRight: {
      type: Boolean,
      default: false
    },
    tooltipTop: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    actualSize () {
      if (this.size !== 'auto') {
        return this.size
      }

      return this.$q.screen.lt.md ? 'lg' : 'md'
    }
  }
}
</script>

<style>
</style>
