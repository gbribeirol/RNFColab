<script>
import FdEmail from 'src/modules/user/comps/FdEmail'
import FdPassword from 'src/modules/user/comps/FdPassword'
import Buttons from './buttons'

export default {
  name: 'LoginForm',

  components: {
    FdEmail,
    FdPassword,
    Buttons
  },

  methods: {
    versaoDefazada () {
      // console.log('----------> 1')
      if (!this.$store.state.app) return true
      // console.log('----------> 2')
      if (!this.$store.state.app.version) return true
      // console.log('----------> 3')
      if (!this.$store.state.app.firestore) return true
      // console.log('----------> 4')
      if (!this.$store.state.app.firestore[0]) return true
      // console.log('----------> 5')
      if (!this.$store.state.app.firestore[0].version) return true
      // console.log('----------> 6')
      return this.$store.state.app.version !== this.$store.state.app.firestore[0].version
    }
  }
}
</script>

<template>
  <section >

    <div class="login-app">
      <!-- <div class="text-center q-pt-lg">
        <img
          src="statics/logo.png"
          width="200px"
        />
      </div> -->

      <div class="q-pt-xl text-h2 text-weight-bold text-blue-8 text-center">
        RNF Colab
      </div>

      <div class="box-inputs q-mt-lg q-pt-xl">

        <div class="q-gutter-y-sm">
          <FdEmail/>
          <FdPassword/>
        </div>

        <Buttons/>
      </div>
    </div>

  </section>
</template>

<style scoped>
</style>
