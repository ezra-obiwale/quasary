<template>
  <QDialog
    ref="QDialog"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <QCard
      ref="QCard"
      :style="cardStyle"
    >
      <template v-if="title || $slots.title || $scopedSlots.title">
        <QCardSection>
          <slot name="title">
            <div class="text-h6">{{ title }}</div>
          </slot>
        </QCardSection>

        <QSeparator v-if="$slots.default" />
      </template>

      <QCardSection
        v-if="$slots.default"
        :style="`max-height: ${maxHeight}`"
        class="scroll"
      >
        <slot />
      </QCardSection>

      <slot
        v-if="!noActions"
        name="actions"
      >
        <QSeparator />

        <QCardActions align="right">
          <QBtn
            v-if="!noOkBtn"
            v-bind="okBtn"
            @click="$emit('ok')"
          />
          <QBtn
            v-if="!noCloseBtn"
            v-bind="closeBtn"
            @click="$emit('close')"
          />
        </QCardActions>
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
    </QCard>
  </QDialog>
</template>

<script>
export default {
  name: 'DialogComponent',
  props: {
    cardStyle: {
      type: [String, Object]
    },
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
      type: String
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
    show   ( ) {
      this.$refs.QDialog.show()
    }
  }
}
</script>
