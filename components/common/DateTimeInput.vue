<template>
  <q-input
    ref="QInput"
    v-model="model"
    v-bind="attrs"
    v-on="$listeners"
    >
    <template #prepend>
      <q-icon ref="QIconPrepend" name="event" class="cursor-pointer">
        <q-popup-proxy ref="dateProxy" transition-show="scale" transition-hide="scale">
          <q-date v-model="model" :mask="mask" today-btn :options="options" @input="() => $refs.dateProxy.hide()" />
        </q-popup-proxy>
      </q-icon>
    </template>
    <template #append>
      <q-icon ref="QIconAppend" name="access_time" class="cursor-pointer">
        <q-popup-proxy ref="timeProxy" transition-show="scale" transition-hide="scale">
          <q-time v-model="model" :mask="mask" :options="options" @input="() => $refs.timeProxy.hide()" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import DateMixin from '../../mixins/Date'

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
  }
}
</script>

<style>
</style>
