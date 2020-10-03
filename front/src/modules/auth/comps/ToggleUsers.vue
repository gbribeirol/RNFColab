<script>
import { mapActions } from 'vuex'

export default {
  name: 'ToggleUsers',

  methods: {
    ...mapActions('auth', ['loginAdmin', 'loginGui', 'loginJoao'])
  }
}
</script>

<template>
  <div>

    <q-btn-dropdown class="q-pa-none fixed-bottom-right" flat no-caps
      color="teal"
      label="login"
      style="bottom: 4em;">

      <q-list>
        <q-item clickable v-close-popup @click="loginAdmin" >
          <q-item-section>
            <q-item-label >Administrador</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="loginGui">
          <q-item-section>
            <q-item-label>Guilherme</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="loginJoao">
          <q-item-section>
            <q-item-label>João</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

    </q-btn-dropdown>

  </div>
</template>

<style>
</style>
