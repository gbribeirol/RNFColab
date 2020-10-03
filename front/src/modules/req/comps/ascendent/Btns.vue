<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Btns',

  computed: {
    ...mapState('req', ['ascStateFlag', 'currentAsc']),
    ...mapGetters('req', ['contentChanged']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
    // lAdd () {
    //   this.$store.dispatch('req/addAscendent')
    //     .then(res => {
    //       this.$store.commit('req/SET_ASC_STATE_FLAG', 'list')
    //       // if (Object.keys(this.copy.file).length !== 0) {
    //       //   this.$router.push({ name: 'goal' })
    //       // }
    //     })
    // },

    // lUpdate () {
    //   this.$store.dispatch('req/updateGoal')
    //   // .then(res => {
    //   //   if (Object.keys(this.copy.file).length !== 0) {
    //   //     this.$router.push({ name: 'goal' })
    //   //   }
    //   // })
    // },

    lErase () {
      this.$store.dispatch('req/eraseGoal')
      // .then(res => {
      //   this.$store.commit('req/SET_REQ_STATE_FLAG', 'list')
      // })
    }
  }
}
</script>

<template>
  <div class="q-gutter-x-xs q-pl-xs">

    <!-- <q-btn v-show="ascStateFlag === 'added' || (ascStateFlag !== 'new' && !contentChanged)" -->
    <q-btn v-show="'new, added, update'.includes(ascStateFlag)"
      label="Voltar"
      class="bg-grey-4"
      flat
      size="xs"
      v-close-popup
      @click="$store.commit('req/SET_ASC_STATE_FLAG', 'list')"
    />

    <!-- NEW -->
    <q-btn v-show="'list'.includes(ascStateFlag)"
      icon="add"
      color="blue-5"
      size="xs"
      round
      @click="$store.dispatch('req/newAscendent')"
    />

    <!-- ADD -->
    <!-- <q-btn v-show="ascStateFlag === 'new' && validAssociation" -->
    <q-btn v-show="'new'.includes(ascStateFlag)"
      label="Adicionar"
      class="bg-grey-4"
      flat
      size="xs"
      @click="$store.dispatch('req/addAscendent')"
    />

    <q-btn v-show="'update'.includes(ascStateFlag) && currentAsc"
      label="Apagar"
      class="bg-grey-4"
      flat
      size="xs"
      v-close-popup
      @click="$store.dispatch('req/deleteAscendent')"
    />

    <!-- <q-btn v-show="ascStateFlag === 'new' || currentAsc"
      label="Cancelar"
      class="q-pa-xs bg-grey-4"
      flat
      v-close-popup
      size="xs"
      @click="$store.commit('req/SET_ASC_STATE_FLAG', 'list')"
    /> -->

    <!-- <q-btn v-show="ascStateFlag === 'update' && contentChanged"
      label="Salvar"
      class="q-pa-xs bg-grey-4"
      flat
      size="xs"
      @click="lUpdate"
    /> -->

  </div>
</template>

<style scoped lang="stylus">
</style>
