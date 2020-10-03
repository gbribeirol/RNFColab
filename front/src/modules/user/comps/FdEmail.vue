<script>
export default {
  name: 'FdEmail',

  data () {
    return {
      lEmail: ''
    }
  },

  mounted () {
  }

  // watch: {
  //   email () {
  //     this.lEmail = this.email
  //   }
  // }
}
</script>

<template>
  <section>

    <!-- :before="[{condition: lEmail.length > 5 && lEmail.length < 9, handler () {}}]" -->
    <q-input type="email"
      label="Email"
      autocomplete
      numeric-keyboard-toggle
      standout
      color="blue-11"
      bg-color="blue-7"
      dense dark
      v-model="lEmail"
      @input="$store.commit('auth/SET_EMAIL', lEmail)">

      <template v-slot:prepend>
        <q-icon name="email" color="yellow"/>
      </template>

    </q-input>

  </section>
</template>

<style scoped>
</style>
