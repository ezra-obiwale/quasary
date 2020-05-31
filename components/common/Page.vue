<template>
  <q-page
    ref="QPage"
    :key="pageIndex"
    :padding="!noPadding"
    class="relative-position"
    :class="{ 'print-pt-remove': hideTitleOnPrint }"
    :style="styleObject"
  >
    <component
      :is="isMobile && !noInfiniteScroll ? 'q-infinite-scroll' : 'div'"
      @load="load"
    >
      <component
        :is="isMobile && !noPullToRefresh ? 'q-pull-to-refresh' : 'div'"
        @refresh="refresh"
      >
        <slot>
          <div class="row">
            <div :class="localCardClass">
              <slot name="card">
                <q-card
                  :class="cardClass"
                  :style="cardStyle"
                >
                  <q-card-section>
                    <slot name="card-content" />
                  </q-card-section>
                </q-card>
              </slot>
            </div>
          </div>
          <div class="row q-mt-md">
            <div :class="localCardClass">
              <slot name="after-card" />
            </div>
          </div>
        </slot>
      </component>

      <q-page-sticky
        v-if="isMobile"
        position="bottom-right"
        :offset="[18, 18]"
      >
        <slot name="page-mobile-buttons">
          <q-fab
            v-if="canImport && !noCreateBtn"
            v-model="fabIsOpen"
            color="primary"
            :flat="fabIsOpen"
            icon="keyboard_arrow_up"
            direction="up"
          >
            <q-fab-action
              round
              color="primary"
              icon="add"
              size="lg"
              :to="`${$route.path}/new`"
            >
              <tool-tip>{{ createBtnText }}</tool-tip>
            </q-fab-action>
            <q-fab-action
              round
              color="secondary"
              icon="file_upload"
              size="lg"
              :to="`${$route.path}/import`"
            >
              <tool-tip>{{ importBtnText }}</tool-tip>
            </q-fab-action>
          </q-fab>
          <q-btn
            v-else-if="canImport"
            fab
            color="secondary"
            icon="file_upload"
            size="lg"
            :to="`${$route.path}/import`"
          >
            <tool-tip>{{ importBtnText }}</tool-tip>
          </q-btn>
          <q-btn
            v-else-if="!noCreateBtn"
            fab
            color="primary"
            icon="add"
            size="lg"
            :to="`${$route.path}/new`"
          >
            <tool-tip>{{ createBtnText }}</tool-tip>
          </q-btn>
        </slot>
      </q-page-sticky>

      <app-loading :showing="working" />
      <template #loading>
        <div
          v-if="canLoadMore"
          class="row justify-center q-my-md"
        >
          <q-spinner-rings
            color="primary"
            size="60px"
          />
        </div>
      </template>
    </component>

    <q-page-sticky
      expand
      position="top"
      v-if="!hideTitle && !isMobile"
    >
      <q-toolbar
        class="q-py-lg q-px-md bg-background"
        :class="{ 'print-hide': hideTitleOnPrint }"
      >
        <div
          :class="toolbarClass"
          class="q-pl-none"
        >
          <slot name="page-desktop-buttons">
            <q-btn
              v-if="canImport"
              :to="`${$route.path}/import`"
              icon="file_upload"
              color="secondary"
              :label="importBtnText"
              class="float-right"
              :class="{ 'on-right': !noCreateBtn }"
            />
            <q-btn
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

            <app-btn
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
      </q-toolbar>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import AppBtn from './Button'

export default {
  name: 'PageComponent',
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
      type: String,
      default: ''
    },
    cardStyle: {
      type: String,
      default: ''
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
      type: String,
      default: ''
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
      type: String,
      default: ''
    },
    titleTemplate: {
      type: Function,
      default: () => title
    },
    working: {
      type: Boolean,
      default: false
    }
  },
  meta () {
    return {
      title: this.title,
      titleTemplate: this.titleTemplate,
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
  components: { AppBtn },
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
