<template>
  <q-header elevated reveal class="bg-primary text-white print-hide">
    <q-toolbar>
      <slot name="before-title">
        <q-btn
          v-if="leftMenuBtn"
          dense
          flat
          round
          icon="menu"
          @click="$emit('leftMenu')"
        />

        <q-btn
          v-if="arrowBackBtn"
          dense
          flat
          round
          icon="arrow_back"
          @click="goBack"
        />
      </slot>

      <q-toolbar-title>
        <slot name="title">
          <template v-if="title">
            {{ title }}
          </template>
        </slot>
      </q-toolbar-title>

      <slot name="after-title">
        <q-btn
          v-if="fullscreenBtn"
          flat
          round
          dense
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          @click="$q.fullscreen.toggle()"
        >
          <tool-tip>
            {{
              $q.fullscreen.isActive ? 'Exit fullscreen' : 'Enter fullscreen'
            }}
          </tool-tip>
        </q-btn>

        <q-btn
          v-if="rightMenuBtn"
          dense
          flat
          round
          icon="menu"
          @click="$emit('rightMenu')"
        />
      </slot>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
    arrowBackBtn: {
      type: Boolean,
      default: false
    },
    fullscreenBtn: {
      type: Boolean,
      default: false
    },
    leftMenuBtn: {
      type: Boolean,
      default: false
    },
    rightMenuBtn: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style></style>
