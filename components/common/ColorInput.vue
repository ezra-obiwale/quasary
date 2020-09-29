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
        name="colorize"
        class="cursor-pointer"
      >
        <QPopupProxy
          ref="proxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <QColor
            v-model="model"
            :color="color"
            :text-color="textColor"
            default-view="palette"
            format-model="hex"
            no-header
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
import FormElementMixin from '../mixins/FormElement'

export default {
  name: 'ColorInputComponent',
  mixins: [FormElementMixin],
  props: {
    color: String,
    textColor: String
  },
  data () {
    return {
      usedSlots: ['default', 'append']
    }
  }
}
</script>

<style>
</style>
