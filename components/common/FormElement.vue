<template>
  <app-element v-model="model" v-bind="attrs" v-on="$listeners">
    <slot />
    <slot name="hint" slot="hint" />
  </app-element>
</template>

<script>
import attrs from '../../mixins/FormElement'

export default {
  name: 'FormElementComponent',
  mixins: [attrs]
}
</script>

<style>
</style>
