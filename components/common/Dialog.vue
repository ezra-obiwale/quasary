<template>
  <q-dialog
    ref="QDialog"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <q-card
      ref="QCard"
      :style="`width: ${width}`"
    >
      <template v-if="title">
        <q-card-section>
          <div class="text-h6">{{ title }}</div>
        </q-card-section>

        <q-separator />
      </template>

      <q-card-section
        :style="`max-height: ${maxHeight}`"
        class="scroll"
      >
        <slot />
      </q-card-section>

      <slot
        v-if="!noActions"
        name="actions"
      >
        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-if="!noOkBtn"
            v-bind="okBtn"
            @click="$emit('ok')"
          />
          <q-btn
            v-if="!noCloseBtn"
            v-bind="closeBtn"
            @click="$emit('close')"
          />
        </q-card-actions>
      </slot>

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
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogComponent',
  props: {
    closeBtn: {
      type: Object,
      default: () => ({ flat: true, label: 'Close', color: 'secondary', vClosePopup: true })
    },
    maxHeight: {
      type: String,
      default: '50vh'
    },
    noActions: {
      type: Boolean,
      default: false
    },
    noCloseBtn: {
      type: Boolean,
      default: false
    },
    noOkBtn: {
      type: Boolean,
      default: false
    },
    okBtn: {
      type: Object,
      default: () => ({ flat: true, label: 'OK', color: 'primary' })
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: 'auto'
    }
  },
  data () {
    return {
      usedSlots: ['default', 'actions']
    }
  },
  methods: {
    hide () {
      this.$refs.QDialog.hide()
    },
    shake () {
      this.$refs.QDialog.shake()
    },
    show () {
      this.$refs.QDialog.show()
    }
  }
}
</script>
