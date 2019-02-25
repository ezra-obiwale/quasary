<template>
  <q-btn :icon="icon" v-on="$listeners">
    <q-popover>
      <q-list separator link no-border>
        <q-item
          v-for="(item, index) in items"
          :key="index"
          v-close-overlay
          @click.native="clicked($event, item)">
          <div v-html="item.text" />
        </q-item>
      </q-list>
    </q-popover>
  </q-btn>
</template>

<script>
export default {
  name: 'AppMenu',
  props: {
    icon: {
      type: String,
      default: 'more_vert'
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    clicked (e, item) {
      if (typeof item.handler == 'function') {
        item.handler()
      }
    }
  }
}
</script>
