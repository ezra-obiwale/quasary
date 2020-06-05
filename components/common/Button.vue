<template>
  <QBtn
    ref="QBtn"
    :loading="loading"
    :disable="disable || loading"
    :color="color"
    :class="{ 'full-width' : !regular }"
    :size="actualSize"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #loading>
      <QSpinnerRings />
    </template>

    <ToolTip
      v-if="tooltip"
      :left="tooltipLeft"
      :right="tooltipRight"
      :bottom="tooltipBottom"
      :top="tooltipTop"
    >{{ tooltip }}</ToolTip>

    <template
      v-for="(fn, key) in $slots"
      :slot="usedSlots.includes(key) ? undefined : key"
    >
      <slot
        v-if="!usedSlots.includes(key)"
        :name="key"
      />
    </template>

    <template
      v-for="(fn, key) in $scopedSlots"
      :slot="usedSlots.includes(key) ? undefined : key"
      slot-scope="scope"
    >
      <slot
        v-if="!usedSlots.includes(key)"
        :name="key"
        v-bind="scope"
      />
    </template>
  </QBtn>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    disable: {
      type: Boolean,
      default: false
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
  data () {
    return {
      usedSlots: ['default', 'loading']
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
