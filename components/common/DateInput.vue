<template>
  <q-input
    ref="QInput"
    v-model="model"
    v-bind="attrs"
    v-on="$listeners"
    @focus="$refs.proxy.show()"
    @click="$refs.proxy.show()"
  >
    <template #append>
      <q-icon
        ref="QIcon"
        name="today"
        class="cursor-pointer"
      >
        <q-popup-proxy
          ref="proxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            v-model="model"
            :mask="mask"
            :options="options"
            today-btn
            @input="() => $refs.proxy.hide()"
          />
        </q-popup-proxy>
      </q-icon>
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
  </q-input>
</template>

<script>
import DateMixin from '../mixins/Date'

export default {
  name: 'DateInputComponent',
  mixins: [DateMixin],
  data () {
    return {
      usedSlots: ['default', 'append']
    }
  }
}
</script>

<style>
</style>
