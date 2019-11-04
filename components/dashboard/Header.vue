<template>
  <q-header elevated reveal class="bg-primary text-white print-hide">
    <q-toolbar>
      <q-btn
        v-if="isMobile && currentUser && (canGoBack || sideBar)"
        dense
        flat
        round
        :icon="canGoBack ? 'arrow_back' : 'menu'"
        @click="toolbarButtonClicked"
      />

      <q-toolbar-title>
        <template v-if="isMobile">
          {{ title }}
        </template>
      </q-toolbar-title>

      <q-btn
        v-if="!isMobile"
        flat
        round
        dense
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        @click="$q.fullscreen.toggle()"
      >
        <tool-tip>{{ $q.fullscreen.isActive ? 'Exit fullscreen' : 'Enter fullscreen' }}</tool-tip>
      </q-btn>
      <q-btn-dropdown
        v-if="currentUser"
        stretch
        auto-close
        flat
        :round="isMobile"
        :dense="isMobile"
        icon="perm_identity"
        text-color="white"
      >
        <q-list>
          <q-item-label header>{{ currentUser.email }}</q-item-label>
          <q-separator inset spaced />
          <q-item to="/user" clickable tabindex="0">
            <q-item-section avatar>
              <q-avatar icon="person" color="primary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Update Profile</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/user/change-password" clickable tabindex="0">
            <q-item-section avatar>
              <q-avatar icon="lock" color="primary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Change Password</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset spaced />
          <q-item clickable tabindex="0" @click="logout">
            <q-item-section avatar>
              <q-avatar icon="logout" color="negative" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Log Out</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HeaderComponent',
  computed: {
    ...mapState('quasary', ['title', 'canGoBack', 'sideBar'])
  },
  methods: {
    toolbarButtonClicked () {
      if (this.canGoBack) {
        this.goBack()
      } else {
        this.$emit('toggleLeftDrawer')
      }
    }
  }
}
</script>

<style>
</style>
