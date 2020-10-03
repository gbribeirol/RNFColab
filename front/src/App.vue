<script>
import { Quasar } from 'quasar'

export default {
  name: 'App',

  mounted () {
    this.$store.dispatch('initApp', null, { root: true })
    // .then(() => {
    //   if (this.$store.state.app.version !== this.$store.state.app.firestore[0].version) {
    //     this.$router.push({ name: 'versaoErrada' })
    //   }
    // })

    this.$i18n.locale = Quasar.lang.getLocale()
    console.log('this.$i18n.locale', this.$i18n.locale)
  }
}
</script>

<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<style scoped>
</style>
