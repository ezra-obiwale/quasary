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
      <q-icon name="colorize" class="cursor-pointer">
        <q-popup-proxy ref="proxy" transition-show="scale" transition-hide="scale">
          <q-color v-model="model" default-view="palette" format-model="hex" no-header />
        </q-popup-proxy>
      </q-icon>
    </template>
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
  name: 'ColorInputComponent',
  mixins: [FormElementMixin]
}
</script>

<style>
</style>
