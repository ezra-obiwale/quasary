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
        name="today"
        class="cursor-pointer"
      >
        <QPopupProxy
          ref="proxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <QDate
            v-model="model"
            :mask="mask"
            :options="options"
            today-btn
            @input="() => $refs.proxy.hide()"
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
