<script>
// import { mapActions } from 'vuex'

export default {
  name: 'Google',

  methods: {
    mLogin () {
      this.$store.commit('auth/SET_AUTH_IN_PROGRESS', true)

      this.$store.dispatch('auth/signInByGoogle').then(res => {
        this.$store.commit('auth/SET_AUTH_IN_PROGRESS', false)
        this.$router.push({ name: 'home' })
      }).catch(() => {
        this.$store.commit('auth/SET_AUTH_IN_PROGRESS', false)
      })
    }
  }
}
</script>

<template>
  <div class="text-center">

    <q-btn flat @click="mLogin">

      <img src="statics/icons/socialNetworks/google.png" width="50px">

    </q-btn>

  </div>
</template>

<style scoped>
</style>
