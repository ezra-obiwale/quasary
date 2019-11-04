<template>
  <q-scroll-area
    :style="`height: ${height}`"
    :thumb-style="thumbStyle"
    :content-style="contentStyle"
    :content-active-style="contentActiveStyle"
  >
  <slot />
  </q-scroll-area>
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
