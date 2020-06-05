<template>
  <QInput
    ref="QInput"
    v-model="model"
    v-bind="attrs"
    v-on="$listeners"
    @focus="$refs.proxy.show()"
    @click="$refs.proxy.show()"
  >
    <template #append>
      <QIcon
        ref="QIcon"
        name="access_time"
        class="cursor-pointer"
      >
        <QPopupProxy
          ref="proxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <QTime
            v-model="model"
            :mask="mask"
            @input="() => $refs.proxy.hide()"
            :now-btn="nowBtn"
          />
        </QPopupProxy>
      </QIcon>
    </template>

    <template v-for="(slot, key) in $slots" :slot="key">
      <slot :name="key" />
    </template>

    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope" />
    </template>
  </QInput>
</template>

<script>
import DateMixin from '../mixins/Date'
import {
  date
} from 'quasar'

export default {
  name: 'TimeInputComponent',
  mixins: [DateMixin],
  props: {
    mask: {
      type: String,
      default: 'hh:mm A'
    },
    nowBtn: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String, Date],
      default: () => new Date()
    }
  },
  data () {
    return {
      usedSlots: ['default', 'append']
    }
  },
  computed: {
    model: {
      set (value) {
        this.$emit('input', value)
      },
      get () {
        let value = this.value

        if (this.mask) {
          if (typeof value === 'number') {
            value = new Date(value)
          }

          if (value instanceof Date) {
            value = date.formatDate(value, this.mask)

            this.$emit('input', value)
          }
        }

        return value
      }
    }
  }
}
</script>

<style>
</style>
