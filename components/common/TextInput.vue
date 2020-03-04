<template>
  <q-input ref="QInput" v-model="model" v-bind="attrs" v-on="$listeners">
    <template v-for="(slot, key) in $slots" :slot="key">
      <slot :name="key" />
    </template>
    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope" />
    </template>
  </q-input>
</template>

<script>
import FormElementMixin from '../../mixins/FormElement'

export default {
  name: 'TextInputComponent',
  mixins: [FormElementMixin]
}
</script>
