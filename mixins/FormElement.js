export default {
  props: {
    value: {
      type: [Number, String, Object, Array, Date],
      default: ''
    }
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
