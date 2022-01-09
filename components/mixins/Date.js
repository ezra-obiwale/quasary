import FormElementMixin from './FormElement'
import { date } from 'quasar'

export default {
  mixins: [FormElementMixin],
  props: {
    color: {
      type: String
    },
    min: {
      type: [String, Date]
    },
    mask: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    max: {
      type: [String, Date]
    },
    textColor: {
      type: String
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

      if ((this.min && date.getDateDiff(dDate, this.min) < 0) || (this.max && date.getDateDiff(dDate, this.max) > 0)) {
        status = false
      }

      return status
    }
  }
}
