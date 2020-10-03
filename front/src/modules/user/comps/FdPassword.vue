<script>
export default {
  name: 'FdPassword',

  data () {
    return {
      lPassword: '',
      isPwd: true
    }
  }

  // computed: {
  //   password () { return this.$store.state.auth.userCredential.password }
  // },

  // mounted () {
  //   this.lPassword = this.password
  // }

  // watch: {
  //   password () {
  //     this.lPassword = this.password
  //   }
  // }
}
</script>

<template>
  <section>

    <q-input :type="isPwd ? 'password' : 'text'"
      label="Senha"
      autocomplete
      standout
      color="blue-11"
      bg-color="blue-7"
      dense dark
      v-model="lPassword"
      :after="[{handler () {}}]"
      @input="$store.commit('auth/SET_PASSWORD', lPassword)">

      <template v-slot:prepend>
        <q-icon name="lock" color="yellow"/>
      </template>

      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility' : 'visibility_off'"
          class="cursor-pointer"
          color="yellow"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

  </section>
</template>

<style scoped>
</style>
