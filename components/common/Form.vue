<template>
  <QForm
    ref="QForm"
    class="q-gutter-y-md"
    v-bind="$attrs"
    v-on="$listeners"
    autofocus
  >
    <slot />

    <div class="text-center">
      <QSeparator
        v-if="!isMobile"
        class="q-mb-md"
      />

      <StickableBtn
        type="submit"
        :text-color="btnTextColor"
        :loading="working"
        :label="btnLabel"
        :regular="regularBtn"
        :non-sticky="nonStickyBtn"
        size="lg"
      />

      <slot name="after-button">
        <QBtn
          v-if="!noCancelBtn && !isMobile"
          class="on-right"
          label="Back"
          flat
          :to="cancelPath"
          replace
        />
      </slot>
    </div>
  </QForm>
</template>

<script>
import StickableBtn from './StickableBtn'

export default {
  name: 'FormComponent',
  components: { StickableBtn },
  props: {
    btnLabel: {
      type: String,
      default: 'Save'
    },
    btnTextColor: {
      type: String
    },
    noCancelBtn: {
      type: Boolean,
      default: false
    },
    noReturn: {
      type: Boolean,
      default: false
    },
    nonStickyBtn: {
      type: Boolean,
      default: false
    },
    regularBtn: {
      type: Boolean,
      default: false
    },
    returnPath: {
      type: String
    },
    working: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      usedSlots: ['default', 'after-button']
    }
  },
  computed: {
    cancelPath () {
      if (!this.noReturn) {
        if (this.returnPath) {
          return this.returnPath
        }

        let pos = this.$route.path.indexOf('/new')
        if (pos === -1) {
          pos = this.$route.path.indexOf('/edit')
        }
        if (pos !== -1) {
          return this.$route.path.substr(0, pos)
        }
      }
      return null
    }
  }
}
</script>
