<template>
    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <!-- sidebar -->
    <q-layout-drawer
      :content-style="style"
      content-class="print-hide"
      side="left"
      v-model="open">
      <q-toolbar :color="toolbarColor" v-if="title || subtitle"
        class="sidebar-header" style="height: 50px">
        <q-toolbar-title>
          <slot name="title">
            <a href="#" class="sidebar-title" @click.prevent="$emit('title')" v-html="title"></a>
          </slot>
          <span slot="subtitle">
            <slot name="subtitle">
              <span v-html="subtitle"></span>
            </slot>
          </span>
        </q-toolbar-title>
      </q-toolbar>

      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit sidebar" style="padding-bottom: 50px">
        <q-list link highlight dark no-border>
          <template v-for="(group, mIndex) in menus">
            <q-list-header :key="`header-${mIndex}`" v-if="group.heading">{{ group.heading }}</q-list-header>
            <template v-for="(menu, index) in group.menus">
              <q-collapsible v-if="menu.links && menu.groupName"
                :key="`col-${mIndex}-${index}`"
                :sublabel="menu.subLevel"
                :icon="menu.groupIcon"
                :label="menu.groupName"
                group="sidebar"
                :opened="menu.name == activeMenuGroup"
                collapse-icon="ion-ios-arrow-down" >
                <template v-for="(link, ind) in menu.links">
                  <q-item
                    :to="link.url || link.path"
                    :key="`col-${mIndex}-${index}-item-${ind}`"
                    class="f-15"
                    @click.native="clicked($event, link)">
                    <q-item-side v-if="link.icon" :icon="link.icon"/>
                    <q-item-main :label="link.text" />
                  </q-item>
                </template>
              </q-collapsible>
              <q-item v-else-if="menu.links"
                v-for="(link, lIndex) in menu.links"
                :to="link.url || link.path"
                :key="`item-${mIndex}-${lIndex}`"
                class="f-15"
                @click.native="clicked($event, link)">
                <q-item-side v-if="link.icon" :icon="link.icon"/>
                <q-item-main :label="link.text" />
              </q-item>
              <q-item link v-else-if="menu.groupName"
                :to="menu.default"
                :key="`item-${mIndex}-${index}`"
                class="f-15"
                @click.native="clicked($event, link)">
                <q-item-side v-if="menu.icon" :icon="menu.icon"/>
                <q-item-main :label="menu.groupName" />
              </q-item>
            </template>
          </template>
        </q-list>
      </q-scroll-area>
    </q-layout-drawer>
</template>

<script>
export default {
  name: 'AppSidebar',
  props: {
    activeMenuGroup: {
      type: String,
      default: ''
    },
    menus: {
      type: [Object, Array],
      required: true
    },
    show: {
      type: Boolean,
      default: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    toolbarColor: {
      type: String,
      default: 'primary'
    },
  },
  computed: {
    open: {
      get () {
        return this.show
      },
      set (value) {
        this.$emit('change', value)
      }
    },
    style () {
      let style = {overflow: 'hidden'}
      if (!this.$q.platform.is.mobile) {
        style.width = '210px'
      }
      return style
    }
  }
}
</script>

<style scoped>
  .sidebar-title {
    color: inherit;
    text-decoration: none;
  }
</style>
