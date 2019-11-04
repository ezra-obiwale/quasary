<template>
  <q-drawer
    v-if="currentUser && sideBar"
    v-model="model"
    elevated
    show-if-above
    side="left"
    class="no-scroll print-hide"
  >
    <q-toolbar class="text-white bg-primary">
      <q-toolbar-title>
        <q-avatar :icon="`img:${logoPath}`" />
        <q-btn
          v-if="canSwitchBranch"
          flat
          round
          @click="$emit('switchBranch')"
          icon="logout"
          color="warning"
          class="float-right"
        >
          <tool-tip right>Switch Branch</tool-tip>
        </q-btn>
        <span
          class="text-truncate"
        >{{ hasBranch() ? currentBranch.name : env('app_name', 'DScribe') }}</span>
      </q-toolbar-title>
    </q-toolbar>
    <scroll-area>
      <q-list separator bordered>
        <template v-for="(nav, index) in navs">
          <template v-if="canShow(nav, index) && showing[index]">
            <side-nav-item v-if="!nav.children" :key="nav.path" v-bind="nav" />
            <template v-else-if="ungroup(nav, index) && ungrouped[index]">
              <template v-for="(subnav, subIndex) in nav.children">
                <side-nav-item v-if="canShow(subnav, `${index}-${subIndex}`) && showing[`${index}-${subIndex}`]" :key="subnav.path" :path="nav.path + subnav.path" v-bind="subnav" />
              </template>
            </template>
            <q-expansion-item
              v-else
              :key="nav.path || `ex-${index}`"
              group="sidenav"
              :content-inset-level="1"
              :icon="nav.icon"
              :label="nav.label"
              :default-opened="expansionIsActive(nav)"
              :header-class="{'text-primary': $route.path.startsWith(nav.path)}"
              expand-separator
            >
              <q-list>
                <template v-for="(subnav, subIndex) in nav.children">
                  <side-nav-item v-if="canShow(subnav, `${index}-${subIndex}`) && showing[`${index}-${subIndex}`]" :key="subnav.path" :path="nav.path + subnav.path" v-bind="subnav" is-child />
                </template>
              </q-list>
            </q-expansion-item>
          </template>
        </template>
      </q-list>
    </scroll-area>
  </q-drawer>
</template>

<script>
import { mapState } from 'vuex'
import SideNavItem from './SideNavItem'

export default {
  name: 'SideNavComponent',
  props: {
    logo: {
      type: String,
      default: ''
    },
    navs: {
      type: Array,
      default: () => []
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SideNavItem
  },
  data () {
    return {
      showing: {},
      ungrouped: {}
    }
  },
  computed: {
    ...mapState('quasary', ['sideBar']),
    canSwitchBranch () {
      return this.hasBranch() && this.currentUser.id && this.currentUser.permissions.includes('admin') && !this.currentUser.branchId
    },
    logoPath () {
      return this.logo || '/statics/icons/icon-128x128.png'
    },
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    async canShow (nav, index) {
      this.$set(this.showing, index, (
        nav.showIf === undefined ||
        (typeof nav.showIf === 'boolean' && nav.showIf) ||
        (typeof nav.showIf === 'function' && await nav.showIf())
      ))
    },
    expansionIsActive (nav) {
      if (typeof nav.activeIf === 'function') {
        return nav.activeIf(this.$route)
      }
      return this.$route.path.startsWith(nav.path)
    },
    async ungroup (nav, index) {
      this.$set(this.ungrouped, index, (
        (typeof nav.ungroup === 'boolean' && nav.ungroup) ||
        (typeof nav.ungroup === 'function' && await nav.ungroup())
      ))
    }
  }
}
</script>

<style>
</style>
