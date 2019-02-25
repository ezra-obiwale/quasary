<template>
  <q-layout :view="layoutView">
    <q-layout-header>
      <q-toolbar
        color="primary"
        inverted>
        <q-btn
          v-if="$q.screen.lt.lg"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>

        <q-btn
          v-if="!$q.platform.is.mobile"
          icon="person"
          :label="userName"
          :round="$q.platform.is.mobile"
          class="no-shadow default-user-dropdown">
          <q-icon v-if="!$q.platform.is.mobile" name="arrow_drop_down" />
          <q-popover fit>
            <user-menu />
          </q-popover>
        </q-btn>
        <q-btn
          v-else
          flat
          dense
          round
          @click="rightDrawerOpen = !rightDrawerOpen"
          aria-label="Menu">
          <q-icon name="person" />
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="rightDrawerOpen"
      content-class="bg-primary"
      side="right">
      <q-card text-color="white" flat square>
        <q-card-title>
          <div class="row">
            <div class="col-xs-12 col-sm-4 text-center">
              <img  src="statics/quasar-logo.png" style="width: 30vw" />
            </div>
            <div class="col-xs-12 col-sm-8 text-center">
              The User Name
            </div>
          </div>
        </q-card-title>
        <q-card-main>
          <user-menu />
        </q-card-main>
      </q-card>
    </q-layout-drawer>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      content-class="bg-primary no-scroll">
      <q-toolbar
        v-if="$q.platform.is.mobile"
        color="primary"
        inverted
        style="height: 8vh">
        <q-toolbar-title>
          {{ $env('app_name') }}
        </q-toolbar-title>
      </q-toolbar>
      <q-scroll-area :style="`height: ${$q.platform.is.mobile ? 92 : 100}vh;`">
        <q-list
          v-for="(menuGroup, menuGroupName) in menus"
          :key="menuGroupName"
          no-border
          link dark
          inset-delimiter
          highlight>
          <template v-for="menu in menuGroup">
            <q-list-header
              v-if="menu.label"
              :key="`${menuGroupName}_${menu.label}_header`" >
              {{ menu.label }}
            </q-list-header>
            <q-collapsible
              v-if="typeof menu.group == 'object'"
              :key="`${menuGroupName}_${menu.label}_collapsible`"
              group="menu"
              :icon="menu.group.icon"
              :label="menu.group.label"
              :to="menu.group.url"
              indent>
              <q-item
                v-for="item in menu.items"
                :key="`${menuGroupName}_${menu.label}_collapsible_${item.label}`"
                :to="menuUrl(item.url, menu.group.url)">
                <q-item-side v-if="item.icon" :icon="item.icon" />
                <q-item-main :label="item.label" :sublabel="item.sublabel" />
              </q-item>
            </q-collapsible>
            <q-item
              v-else
              v-for="item in menu.items"
              :key="`${menuGroupName}_${item.label}`"
              :to="menuUrl(item.url, menu.group.url)">
              <q-item-side v-if="item.icon" :icon="item.icon" />
              <q-item-main :label="item.label" :sublabel="item.sublabel" />
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import menus from 'pages/menus'
import { openURL } from 'quasar'
import UserMenu from './UserMenu'
import { mapState } from 'vuex'

export default {
  name: 'AppDashboard',
  props: {
    title: {
      type: String,
      default: ''
    },
    userName:  {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      rightDrawerOpen: false
    }
  },
  components: { UserMenu },
  computed: {
    layoutView () {
      return this.$q.platform.is.mobile ? 'lHh lpr lFf' : 'hHh lpr lFf'
    },
    menus () {
      return menus
    }
  },
  methods: {
    openURL,
    menuUrl(url, groupUrl) {
      if (url == '/') {
        return groupUrl || url
      } else {
        return groupUrl + url
      }
    }
  }
}
</script>
