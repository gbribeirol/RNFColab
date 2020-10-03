<script>
import { mapState } from 'vuex'
import User from '../models/User'
// import cpForm from './Form'
// import cpList from './List'

export default {
  name: 'User',

  computed: {
    ...mapState('user', ['featureName'])
    // ...mapState('auth', ['user'])
  },

  created () {
    this.$store.commit('SET_CURRENT_FEATURE', this.featureName)
    // this.$store.commit('profile/LOAD')
    // this.loadPosts()
  },

  methods: {
    deleteRow () {
      this.$q.notify({
        color: 'secondary',
        icon: 'delete',
        message: `Will delete the selected row${this.selectedSecond.length > 1 ? 's' : ''} later, ok?`
      })
    },

    createUser (user) {
      this.$store.dispatch('user/createUserWithEmail', new User(user))
    }
  }
}
</script>

<template>
  <section>

    <!-- <div class="q-ma-xs">

      <q-btn
        label="Criar Visitante"
        color="blue-7"
        @click="createUser($store.state.user.userVisitante)"
      />

    </div> -->

    <!-- <q-btn color="primary" class="q-mt-md" flat @click="new_">
      <q-icon name="add"/>Novo
    </q-btn> -->

    <!-- <q-btn class="q-mt-md q-ml-md"
      icon="add"
      label="Novo"
      @click="new_"/> -->

    <!-- <cp-table style="margin: 10px"/> -->

  </section>
</template>

<style lang="stylus" scoped>
  // .q-list
  //   color red
</style>
