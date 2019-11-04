<template>
  <app-select :options="stateOptions" :loading="loading" @input="SELECT_STATE" v-bind="$attrs" v-on="$listeners">
    <slot />
  </app-select>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'NigerianStatesComponent',
  props: {
    disabledOptions: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapState('quasary', ['states']),
    stateOptions () {
      let options = []
      for (let id in this.states) {
        let option = {
          label: this.states[id].name,
          value: this.states[id].id
        }
        if (this.disabledOptions.indexOf(this.states[id].id) !== -1) {
          option.disable = true
        }
        options.push(option)
      }
      return options
    }
  },
  created () {
    this.load()
  },
  methods: {
    ...mapActions('quasary', ['LOAD_NIGERIAN_STATES']),
    ...mapMutations('quasary', ['SELECT_STATE']),
    load () {
      this.loading = true
      this.tryCatch(async () => {
        await this.LOAD_NIGERIAN_STATES()
        this.loading = false
      }, () => {
        this.loading = false
        this.notify('Load states failed', 'negative')
      })
    }
  }
}
</script>
