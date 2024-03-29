<template>
  <QCardActions
    ref="QCardActions"
    :class="{'bg-primary-light': confirmDelete}"
    v-bind="$attrs"
  >
    <template v-if="confirmDelete">
      <div
        class="on-left"
        :class="{'text-negative': deleteErrorMessage}"
      >{{ deleteMessage }}</div>

      <div class="text-right">
        <QBtn
          class="on-left"
          :loading="deleting"
          :disable="deleting"
          flat
          :label="deleteErrorMessage ? 'Retry?' : 'Yes'"
          color="negative"
          @click="emitDelete"
        />

        <QBtn
          v-if="!deleting"
          flat
          label="No"
          color="primary"
          @click="cancelDelete"
        />
      </div>
    </template>

    <template v-else>
      <slot name="before" />

      <QBtn
        ref="QBtnEdit"
        v-if="!noEdit"
        flat
        :label="iconsOnly ? '' : 'Edit'"
        :icon="noIcons ? '' : 'edit'"
        color="primary"
        @click="edit"
      />

      <QBtn
        ref="QBtnDelete"
        v-if="!noDelete"
        flat
        :label="iconsOnly ? '' : 'Delete'"
        :icon="noIcons ? '' : 'delete'"
        color="negative"
        @click="confirmDelete = true"
      />

      <slot name="after" />
    </template>

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
  </QCardActions>
</template>

<script>
export default {
  name: 'CardActionsComponent',
  inheritAttrs: false,
  props: {
    dataId: {
      type: [String, Number]
    },
    deleteConfirmationMessage: {
      type: String,
      default: 'Really delete?'
    },
    deleteErrorMessage: {
      type: String
    },
    deleting: {
      type: Boolean,
      default: false
    },
    iconsOnly: {
      type: Boolean,
      default: false
    },
    noDelete: {
      type: Boolean,
      default: false
    },
    noEdit: {
      type: Boolean,
      default: false
    },
    noEditRedirect: {
      type: Boolean,
      default: false
    },
    noIcons: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      confirmDelete: false,
      usedSlots: ['default', 'before', 'after']
    }
  },
  computed: {
    deleteMessage () {
      return this.deleting ? 'Deleting' : (this.deleteErrorMessage || this.deleteConfirmationMessage)
    }
  },
  methods: {
    cancelDelete () {
      this.confirmDelete = false
      this.$emit('clearDeleteError')
    },
    edit () {
      if (this.noEditRedirect) {
        return this.$emit('edit')
      }
      this.$router.push(`${this.$route.path}/edit/${this.dataId}`)
    },
    emitDelete () {
      if (!this.deleting) {
        this.$emit('delete')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.bg-primary-light {
  background-color: lighten($primary, 50);
}
</style>
