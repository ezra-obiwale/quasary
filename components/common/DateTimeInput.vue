<template>
  <QInput
    ref="QInput"
    v-model="model"
    v-bind="attrs"
    v-on="$listeners"
  >
    <template #prepend>
      <QIcon
        ref="QIconPrepend"
        name="event"
        class="cursor-pointer"
      >
        <QPopupProxy
          ref="dateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <QDate
            v-model="model"
            :color="color"
            :text-color="textColor"
            :mask="mask"
            today-btn
            :options="options"
            @input="() => $refs.dateProxy.hide()"
          />
        </QPopupProxy>
      </QIcon>
    </template>

    <template #append>
      <QIcon
        ref="QIconAppend"
        name="access_time"
        class="cursor-pointer"
      >
        <QPopupProxy
          ref="timeProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <QTime
            v-model="model"
            :color="color"
            :text-color="textColor"
            :mask="mask"
            :options="options"
            @input="() => $refs.timeProxy.hide()"
          />
        </QPopupProxy>
      </QIcon>
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
  </QInput>
</template>

<script>
import DateMixin from '../mixins/Date'
export default {
  name: 'DateTimeInputComponent',
  mixins: [DateMixin],
  props: {
    mask: {
      type: String,
      default: 'YYYY-MM-DD hh:mm A'
    },
    value: {
      type: [Number, String, Date],
      default: () => new Date()
    }
  },
  data () {
    return {
      usedSlots: ['default', 'append', 'prepend']
    }
  }
}
</script>

<style>
</style>
