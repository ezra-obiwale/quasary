<template>
  <app-select
    ref="Select"
    :options="lgaOptions"
    :loading="loading"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />

    <template
      v-for="(fn, key) in $slots"
      :slot="key"
    >
      <slot
        v-if="!usedSlots.includes(key)"
        :name="key"
      />
    </template>
    <template
      v-for="(fn, key) in $scopedSlots"
      :slot="key"
      slot-scope="scope"
    >
      <slot
        v-if="!usedSlots.includes(key)"
        :name="key"
        v-bind="scope"
      />
    </template>
  </app-select>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'LgasComponent',
  props: {
    disabledOptions: {
      type: Array,
      default: () => []
    },
    noStateMessage: {
      type: String,
      default: 'Select state'
    },
    state: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      canResetValue: false,
      loading: false,
      usedSlots: ['default']
    }
  },
  computed: {
    ...mapState('quasary', ['stateLGAs']),
    lgas () {
      return this.state.value ? this.stateLGAs[this.state.value] : {}
    },
    lgaOptions () {
      let options = []

      const lgas = this.lgas || {}

      for (let id in lgas) {
        let option = {
          label: lgas[id].name,
          value: lgas[id].id
        }
        if (this.disabledOptions.indexOf(lgas[id].id) !== -1) {
          option.disable = true
        }
        options.push(option)
      }
      return options
    }
  },
  watch: {
    state (value, old) {
      if (this.canResetValue) {
        this.$emit('input', '')
      }
      if (value) {
        this.load(value)
      }
      this.canResetValue = true
    }
  },
  created () {
    if (!this.state) {
      return
    }
    this.load()
  },
  methods: {
    ...mapActions('quasary', ['LOAD_STATE_LGAS']),
    load () {
      if (!this.state.value) {
        return
      }
      this.loading = true
      this.tryCatch(async () => {
        await this.LOAD_STATE_LGAS(this.state.value)
        this.loading = false
      }, () => {
        this.loading = false
        this.notify('Load LGAs failed', 'negative')
      })
    }
  }
}
</script>
