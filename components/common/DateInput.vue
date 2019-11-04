<template>
  <q-input
    v-model="model"
    v-bind="attrs"
    v-on="$listeners"
    @focus="$refs.proxy.show()"
    @click="$refs.proxy.show()"
    >
    <template #append>
      <q-icon name="today" class="cursor-pointer">
        <q-popup-proxy ref="proxy" transition-show="scale" transition-hide="scale">
          <q-date v-model="model" :mask="mask" :options="options" today-btn @input="() => $refs.proxy.hide()" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import DateMixin from '../../mixins/Date'

export default {
  name: 'DateInputComponent',
  mixins: [DateMixin]
}
</script>

<style>
</style>
