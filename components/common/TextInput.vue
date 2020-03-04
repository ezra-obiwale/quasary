<template>
  <q-input ref="QInput" v-model="model" v-bind="attrs" v-on="$listeners">
    <template v-for="(fn, slot) in $slots" :slot="slot" slot-scope="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </q-input>
</template>

<script>
import FormElementMixin from '../mixins/FormElement'

export default {
  name: 'TextInputComponent',
  mixins: [FormElementMixin]
}
</script>
