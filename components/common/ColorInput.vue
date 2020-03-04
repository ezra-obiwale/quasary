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
        name="colorize"
        class="cursor-pointer"
      >
        <q-popup-proxy
          ref="proxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-color
            v-model="model"
            default-view="palette"
            format-model="hex"
            no-header
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
import FormElementMixin from '../mixins/FormElement'

export default {
  name: 'ColorInputComponent',
  mixins: [FormElementMixin],
  data () {
    return {
      usedSlots: ['default', 'append']
    }
  }
}
</script>

<style>
</style>
