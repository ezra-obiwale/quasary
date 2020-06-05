<template>
  <QCardSection
    ref="QCardSection"
    class="row"
  >
    <div class="col">
      <slot />

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
    </div>

    <div
      v-if="$slots['right-side'] || $slots['menu-list'] || $slots['menu-list-items']"
      class="col-auto"
    >
      <slot name="right-side">
        <QBtn
          ref="QBtn"
          color="primary"
          round
          flat
          icon="more_vert"
        >
          <QMenu
            anchor="top left"
            self="top right"
            auto-close
          >
            <slot name="menu-list">
              <QList>
                <slot name="menu-list-items" />
              </QList>
            </slot>
          </QMenu>
        </QBtn>
      </slot>
    </div>
  </QCardSection>
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