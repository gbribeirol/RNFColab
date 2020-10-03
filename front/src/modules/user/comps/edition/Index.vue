<script>
import { mapState } from 'vuex'
import MyBtn from 'src/comps/Btn'

export default {
  name: 'Auth',

  components: {
    MyBtn
  },

  data: () => ({
    user: {
      email: 'joao.o.frade',
      password: '123456'
    }
  }),

  computed: {
    ...mapState('auth', ['featureName', 'suffix'])
  },

  mounted () {
    this.$store.commit('SET_CURRENT_FEATURE', this.featureName)
    // this.$store.dispach('auth/onChangeAuth')
  }
}
</script>

<template>
  <q-page padding class="justify-center" align="center">

    <div class="row">

      <div class="col-auto q-ma-xs">
        <q-input class="bg-indigo-2 text-indigo"
          color="yellow-2"
          stack-label="Apelido"
          inverted-light
          v-model="user.nickname"
         />
      </div>

      <div class="col-auto q-ma-xs">
        <q-input class="bg-indigo-2 text-indigo"
          color="yellow-2"
          stack-label="Nome"
          max-length="16"
          inverted-light
          v-model="user.name"
         />
      </div>

      <div class="col-auto q-ma-xs">
        <q-input class="bg-indigo-2 text-indigo"
          color="yellow-2"
          stack-label="CPF"
          max-length="16"
          inverted-light
          v-model="user.cpf"
         />
      </div>

      <div class="col-auto q-ma-xs">
        <q-input class="bg-indigo-2 text-indigo"
          color="yellow-2"
          stack-label="Nascimento"
          max-length="16"
          inverted-light
          v-model="user.birthDate"
         />
      </div>

      <div class="col-auto q-ma-xs">
        <q-input class="bg-indigo-2 text-indigo"
          color="yellow-2"
          stack-label="Email"
          max-length="16"
          inverted-light
          v-model="user.email"
         />
      </div>

      <div class="col-auto q-ma-xs">
        <q-input class="bg-indigo-2 text-indigo"
          color="yellow-2"
          stack-label="Telefone"
          max-length="16"
          inverted-light
          v-model="user.phoneNumber"
         />
      </div>

    </div>

    <div class="row">
      <div class="col">
        <MyBtn class="q-mt-lg"
          icon="save"
          label="Gravar"
          @click="$store.dispatch('user/saveNew', user)"/>
      </div>
    </div>

  </q-page>
</template>

<style scoped>
</style>
