<template>
  <QPage
    ref="QPage"
    :key="pageIndex"
    :padding="!noPadding"
    class="relative-position"
    :class="{ 'print-pt-remove': hideTitleOnPrint }"
    :style="styleObject"
    v-bind="$attrs"
  >
    <component
      :is="isMobile && !noInfiniteScroll ? 'QInfiniteScroll' : 'div'"
      @load="load"
    >
      <component
        :is="isMobile && !noPullToRefresh ? 'QPullToRefresh' : 'div'"
        @refresh="refresh"
      >
        <slot>
          <div class="row">
            <div :class="localCardClass">
              <slot name="before-card" />

              <slot name="card">
                <QCard
                  :class="cardClass"
                  :style="cardStyle"
                >
                  <QCardSection>
                    <slot name="card-content" />
                  </QCardSection>
                </QCard>
              </slot>

              <slot name="after-card" />
            </div>
          </div>
        </slot>
      </component>

      <QPageSticky
        v-if="isMobile"
        position="bottom-right"
        :offset="[18, 18]"
      >
        <slot name="page-mobile-buttons">
          <QFab
            v-if="canImport && !noCreateBtn"
            v-model="fabIsOpen"
            color="primary"
            :flat="fabIsOpen"
            icon="keyboard_arrow_up"
            direction="up"
          >
            <QFabAction
              round
              color="primary"
              icon="add"
              size="lg"
              :to="`${$route.path}/new`"
            >
              <ToolTip>{{ createBtnText }}</ToolTip>
            </QFabAction>

            <QFabAction
              round
              color="secondary"
              icon="file_upload"
              size="lg"
              :to="`${$route.path}/import`"
            >
              <ToolTip>{{ importBtnText }}</ToolTip>
            </QFabAction>
          </QFab>

          <QBtn
            v-else-if="canImport"
            fab
            color="secondary"
            icon="file_upload"
            size="lg"
            :to="`${$route.path}/import`"
          >
            <ToolTip>{{ importBtnText }}</ToolTip>
          </QBtn>

          <QBtn
            v-else-if="!noCreateBtn"
            fab
            color="primary"
            icon="add"
            size="lg"
            :to="`${$route.path}/new`"
          >
            <ToolTip>{{ createBtnText }}</ToolTip>
          </QBtn>
        </slot>
      </QPageSticky>

      <Loading :showing="working" />

      <template #loading>
        <div
          v-if="canLoadMore"
          class="row justify-center q-my-md"
        >
          <QSpinnerRings
            color="primary"
            size="60px"
          />
        </div>
      </template>
    </component>

    <QPageSticky
      expand
      position="top"
      v-if="!hideTitle && !isMobile"
    >
      <QToolbar
        class="q-py-lg q-px-md bg-background"
        :class="{ 'print-hide': hideTitleOnPrint }"
      >
        <div
          :class="toolbarClass"
          class="q-pl-none"
        >
          <slot name="page-desktop-buttons">
            <QBtn
              v-if="canImport"
              :to="`${$route.path}/import`"
              icon="file_upload"
              color="secondary"
              :label="importBtnText"
              class="float-right"
              :class="{ 'on-right': !noCreateBtn }"
            />

            <QBtn
              v-if="!noCreateBtn"
              :to="`${$route.path}/new`"
              icon="add"
              color="primary"
              :label="createBtnText"
              class="float-right"
            />
          </slot>

          <div
            class="text-h4 ellipsis"
            :class="{ 'text-center': centerTitle }"
          >
            {{ title }}

            <slot name="beside-title" />

            <Button
              v-if="!noSorting"
              color="primary"
              icon="sort"
              tooltip="Sort Alphabetically"
              tooltip-right
              regular
              flat
              round
              @click="$emit('sort')"
            />
          </div>
        </div>
      </QToolbar>
    </QPageSticky>
  </QPage>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Button from './Button'
import Loading from './Loading'
import ToolTip from './ToolTip'

export default {
  name: 'PageComponent',
  components: { Button, Loading, ToolTip },
  props: {
    canGoBack: {
      type: Boolean,
      default: false
    },
    canImport: {
      type: Boolean,
      default: false
    },
    canLoadMore: {
      type: Boolean,
      default: false
    },
    cardClass: {
      type: String
    },
    cardStyle: {
      type: String
    },
    centerTitle: {
      type: Boolean,
      default: false
    },
    createBtnText: {
      type: String,
      default: 'Create New'
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    hideTitle: {
      type: Boolean,
      default: false
    },
    hideTitleOnPrint: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    importBtnText: {
      type: String,
      default: 'Upload'
    },
    noCreateBtn: {
      type: Boolean,
      default: false
    },
    noInfiniteScroll: {
      type: Boolean,
      default: false
    },
    noPadding: {
      type: Boolean,
      default: false
    },
    noPullToRefresh: {
      type: Boolean,
      default: false
    },
    noSideBar: {
      type: Boolean,
      default: false
    },
    noSorting: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    titleTemplate: {
      type: Function
    },
    working: {
      type: Boolean,
      default: false
    }
  },
  meta () {
    const $vm = this

    return {
      title: this.title,
      titleTemplate () {
        return $vm.titleTemplate ? $vm.titleTemplate(...arguments) : $vm.title
      },
      noscript: {
        default: 'This page requires javascript'
      }
    }
  },
  data () {
    return {
      fabIsOpen: false
    }
  },
  computed: {
    ...mapState('quasary', { pageIndex: 'index' }),
    localCardClass () {
      return `${this.getWidthClasses(this.fullWidth)} ${this.cardClass}`
    },
    styleObject () {
      if (!this.hideTitle && !this.isMobile) {
        return { paddingTop: '100px' }
      }
      return {}
    },
    toolbarClass () {
      return this.getWidthClasses(this.centerTitle || this.fullWidth)
    }
  },
  watch: {
    canGoBack (value) {
      this.CAN_GO_BACK(value)
    },
    noSideBar (value) {
      this.SIDE_BAR(value)
    },
    title (value) {
      this.SET_TITLE(value)
    }
  },
  created () {
    this.SET_TITLE(this.title)
    this.CAN_GO_BACK(this.canGoBack)
    this.SIDE_BAR(!this.noSideBar)
  },
  methods: {
    ...mapMutations('quasary', ['SET_TITLE', 'CAN_GO_BACK', 'SIDE_BAR']),
    load (index, done) {
      this.$emit('loadPage', { index, done })
    },
    refresh (done) {
      this.$emit('refresh', done)
    },
    getWidthClasses (fullWidth) {
      return fullWidth
        ? 'col-xs-12'
        : 'col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3'
    }
  }
}
</script>

<style scoped>
@media print {
  .print-pt-remove {
    padding-top: 0 !important;
  }
}
</style>
