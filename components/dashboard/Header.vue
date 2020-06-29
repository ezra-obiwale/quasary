<template>
  <QHeader
    elevated
    reveal
    :class="`${color} ${bgColor} ${!showInPrint ? 'print-hide' : ''}`"
  >
    <QToolbar>
      <slot name="before-title">
        <QBtn
          v-if="leftMenuBtn"
          dense
          flat
          round
          icon="menu"
          @click="$emit('leftMenu')"
        />

        <QBtn
          v-if="arrowBackBtn"
          dense
          flat
          round
          icon="arrow_back"
          @click="goBack"
        />
      </slot>

      <QToolbarTitle v-if="title || $slots['title']">
        <slot name="title">
          <template v-if="title">
            {{ title }}
          </template>
        </slot>
      </QToolbarTitle>

      <slot name="after-title">
        <QBtn
          v-if="fullscreenBtn"
          flat
          round
          dense
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          @click="$q.fullscreen.toggle()"
        >
          <ToolTip>
            {{ $q.fullscreen.isActive ? 'Exit fullscreen' : 'Enter fullscreen' }}
          </ToolTip>
        </QBtn>

        <QBtn
          v-if="rightMenuBtn"
          dense
          flat
          round
          icon="menu"
          @click="$emit('rightMenu')"
        />
      </slot>
    </QToolbar>
  </QHeader>
</template>

<script>
import Tooltip from '../common/ToolTip'

export default {
  name: 'HeaderComponent',
  components: { Tooltip },
  props: {
    arrowBackBtn: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'text-white'
    },
    bgColor: {
      type: String,
      default: 'bg-primary'
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
    showInPrint: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    }
  }
}
</script>

<style></style>
