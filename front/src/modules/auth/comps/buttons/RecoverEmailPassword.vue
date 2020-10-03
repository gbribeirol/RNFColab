<script>
import { mapActions } from 'vuex'

export default {
  name: 'RecoverEmailPassword',

  methods: {
    ...mapActions('auth', ['signInByEmail'])
  }
}
</script>

<template>
  <section>

    <q-btn
      class="text-weight-bold"
      label="Recuperar senha"
      color="black"
      no-caps
      flat
      size="md"
      @click="$router.push({ name: 'authRecoverEmailPassword' })"
   />
    <!-- @click="signInByEmail().then(res => $router.push({ name: 'home' }))" -->

  </section>
</template>

<style scoped lang="stylus">
</style>
