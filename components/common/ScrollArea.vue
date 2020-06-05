<template>
  <QScrollArea
    ref="QScrollArea"
    :style="`height: ${height}`"
    :thumb-style="thumbStyle"
    :content-style="contentStyle"
    :content-active-style="contentActiveStyle"
  >
    <slot />

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
  </QScrollArea>
</template>
<script>
import { colors } from 'quasar'

const { getBrand } = colors

export default {
  name: 'ScrollAreaComponent',
  props: {
    height: {
      type: String,
      default: 'calc(100vh - 50px)'
    }
  },
  data () {
    return {
      usedSlots: ['default']
    }
  },
  computed: {
    contentStyle () {
      return {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      }
    },
    contentActiveStyle () {
      return {
        backgroundColor: '#eee',
        color: 'black'
      }
    },
    thumbStyle () {
      return {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: getBrand('primary'),
        width: '5px',
        opacity: 0.75
      }
    }
  }
}
</script>
