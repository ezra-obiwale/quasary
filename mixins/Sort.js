export default {
  data () {
    return {
      sort: null
    }
  },
  methods: {
    toggleSort (event) {
      if (!this.sort || this.sort === -1) {
        this.sort = 1
      } else {
        this.sort = -1
      }

      this.$emit('sort', event)
    }
  }
}
