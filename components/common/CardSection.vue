<template>
  <q-card-section
    ref="QCardSection"
    class="row"
  >
    <div class="col">
      <slot />

      <template
        v-for="(fn, key) in $slots"
        :slot="key"
      >
        <slot
          v-if="!usedSlots.includes(key)"
          :name="key"
        />
      </template>
      <template
        v-for="(fn, key) in $scopedSlots"
        :slot="key"
        slot-scope="scope"
      >
        <slot
          v-if="!usedSlots.includes(key)"
          :name="key"
          v-bind="scope"
        />
      </template>
    </div>
    <div
      v-if="$slots['right-side'] || $slots['menu-list'] || $slots['menu-list-items']"
      class="col-auto"
    >
      <slot name="right-side">
        <q-btn
          ref="QBtn"
          color="primary"
          round
          flat
          icon="more_vert"
        >
          <q-menu
            anchor="top left"
            self="top right"
            auto-close
          >
            <slot name="menu-list">
              <q-list>
                <slot name="menu-list-items" />
              </q-list>
            </slot>
          </q-menu>
        </q-btn>
      </slot>
    </div>
  </q-card-section>
</template>

<script>
export default {
  name: 'CardSectionComponent',
  data () {
    return {
      usedSlots: ['default', 'right-side', 'menu-list', 'menu-list-items']
    }
  }
}
</script>