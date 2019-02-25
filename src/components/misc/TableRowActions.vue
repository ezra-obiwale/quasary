<template>
  <q-btn
    v-if="actions.length && (actions.length > 1 || dropdown.forSingle)"
    v-bind="dropdown"
    flat
    round
    icon="more_vert"
    @click.stop>
    <q-popover>
      <q-list link highlight>
        <q-item v-for="(button, index) in actions" :key="index" @click.native="clicked($event, button)" v-bind="button.attributes" class="tb-item" v-close-overlay>
          <q-item-side :icon="button.icon" v-if="button.icon" />
          <q-item-main>
            <q-item-tile label>{{ button.text }}</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
    </q-popover>
  </q-btn>
  <q-btn v-else-if="actions.length" :label="actions[0].text" :icon="actions[0].icon" @click="clicked($event, actions[0])" v-bind="actions[0].attributes" />
</template>

<script>
export default {
  name: 'TableRowActions',
  props: {
    actions: {
      type: Array,
      required: true
    },
    dropdown: {
      type: Object,
      default: function() {
        return {}
      }
    },
    row: {
      type: Object,
      required: true
    }
  },
  methods: {
    clicked (e, button) {
      if (typeof button.handler == 'function') {
        button.handler(this.row)
      }
    }
  }
}
</script>
