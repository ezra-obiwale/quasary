<template>
  <q-card-section
    ref="QCardSection"
    class="row"
  >
    <div class="col">
      <slot />
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
    <template v-for="(slot, key) in $slots" :slot="key">
      <slot :name="key" />
    </template>
    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope" />
    </template>
  </q-card-section>
</template>
