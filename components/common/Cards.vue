<template>
  <div class="row q-col-gutter-lg">
    <template v-for="(current, index) in data">
      <div
        :key="`${current.id}`"
        :class="`col-xs-${xs} col-sm-${sm} col-md-${md} col-lg-${lg} col-xl-${xl}`"
      >
        <q-card v-bind="$attrs">
          <slot
            :current="current"
            :index="index"
          />

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
        </q-card>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'CardsComponent',
  inheritAttrs: false,
  props: {
    data: {
      type: Array,
      default: () => []
    },
    lg: {
      type: Number,
      default: 3
    },
    md: {
      type: Number,
      default: 4
    },
    sm: {
      type: Number,
      default: 6
    },
    xl: {
      type: Number,
      default: 2
    },
    xs: {
      type: Number,
      default: 12
    }
  },
  data () {
    return {
      usedSlots: ['default']
    }
  }
}
</script>

<style>
</style>
