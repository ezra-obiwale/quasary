<template>
  <component :is="tag" v-bind="$attrs" v-on="$listeners">
    <slot />
    <slot name="hint" slot="hint" />
    <!-- <slot v-for="(name, nodes) in $slots" :name="name" :slot="name"> -->
      <!-- {{ nodes }}
    </slot> -->
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
