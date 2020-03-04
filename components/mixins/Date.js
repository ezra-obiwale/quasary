import FormElementMixin from './FormElement'
import { date } from 'quasar'

export default {
  mixins: [FormElementMixin],
  props: {
    min: {
      type: [String, Date],
      default: ''
    },
    mask: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    max: {
      type: [String, Date],
      default: ''
    },
    value: {
      type: [Number, String, Date],
      default: () => date.formatDate(new Date(), 'YYYY-MM-DD')
    }
  },
  computed: {
    model: {
      set (value) {
        this.$emit('input', value)
      },
      get () {
        return this.mask ? date.formatDate(new Date(this.value), this.mask) : this.value
      }
    }
  },
  methods: {
    options (dDate) {
      let status = true
      if ((this.min && dDate < this.min) || (this.max && dDate > this.max)) {
        status = false
      }
      return status
    }
  }
}
