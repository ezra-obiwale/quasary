<template>
  <q-form
    ref="QForm"
    class="q-gutter-y-md"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
    <div class="text-center">
      <q-separator
        v-if="!isMobile"
        class="q-mb-md"
      />
      <stickable-btn
        type="submit"
        mobile-icon="check"
        :loading="working"
        :label="btnLabel"
        :regular="regularBtn"
        :non-sticky="nonStickyBtn"
      />
      <slot name="after-button">
        <q-btn
          v-if="!noCancelBtn && !isMobile"
          class="on-right"
          color="primary"
          label="Back"
          flat
          :to="cancelPath"
          replace
        />
      </slot>
    </div>
  </q-form>
</template>
<script>
export default {
  name: 'FormComponent',
  props: {
    btnLabel: {
      type: String,
      default: 'Save'
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
      type: String,
      default: ''
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
