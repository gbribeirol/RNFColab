<script>
import { mapState } from 'vuex'

export default {
  name: 'Login',

  data () {
    return {
      percentage: 0
    }
  },

  computed: {
    ...mapState('auth', ['authInProgress'])
  },

  methods: {
    mLogin () {
      this.$store.commit('auth/SET_AUTH_IN_PROGRESS', true)

      this.$store.dispatch('auth/signInByEmail', this.$store.state.auth.userCredential).then(res => {
        this.$router.push({ name: 'home' })
      }).finally(() => {
        this.$store.commit('auth/SET_AUTH_IN_PROGRESS', false)
      })
    }
  }
}
</script>

<template>
  <div class="text-center">

    <q-btn
      label="Entrar"
      color="blue-7"
      class="q-my-lg q-px-md"
      :loading="authInProgress"
      :percentage="percentage"
      @click="mLogin"
    />

  </div>
</template>

<style scoped>
</style>
