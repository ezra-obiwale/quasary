<template>
  <q-input
    ref="QInput"
    v-model="model"
    v-bind="attrs"
    v-on="$listeners"
  >
    <template
      v-for="(fn, key) in $slots"
      :slot="key"
    >
      <slot
        v-if="!usedSlots.includes(key)"
        :name="key"
      />
    </template>
    <template
      v-for="(fn, key) in $scopedSlots"
      :slot="key"
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
import FormElementMixin from '../mixins/FormElement'

export default {
  name: 'TextInputComponent',
  mixins: [FormElementMixin],
  data () {
    return {
      usedSlots: ['default']
    }
  }
}
</script>
