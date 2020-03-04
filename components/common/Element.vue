<template>
  <component :is="tag" v-bind="$attrs" v-on="$listeners">
    <template v-for="(slot, key) in $slots" :slot="key">
      <slot :name="key" />
    </template>
    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope" />
    </template>
  </component>
</template>

<script>
export default {
  name: 'ElementComponent',
  props: {
    tag: {
      type: String,
      required: true
    }
  }
}
</script>
