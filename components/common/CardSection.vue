<template>
    <q-card-section class="row">
        <div class="col">
            <slot />
        </div>
        <div v-if="$slots['right-side'] || $slots['menu-list'] || $slots['menu-list-items']" class="col-auto">
          <slot name="right-side">
            <q-btn color="primary" round flat icon="more_vert">
              <q-menu anchor="top left" self="top right" auto-close>
                  <slot name="menu-list">
                      <q-list>
                          <slot name="menu-list-items" />
                      </q-list>
                  </slot>
              </q-menu>
            </q-btn>
          </slot>
        </div>
    </q-card-section>
</template>
