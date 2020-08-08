export default {
  props: {
    value: {}
  },
  computed: {
    attrs () {
      return {
        size: 'md',
        outlined: true,
        ...this.$attrs
      }
    },
    model: {
      set (value) {
        this.$emit('input', value)
      },
      get () {
        return this.value
      }
    }
  }
}
