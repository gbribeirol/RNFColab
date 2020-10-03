<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Btns',

  computed: {
    ...mapState('req', ['desStateFlag', 'currentDes']),
    ...mapGetters('req', ['contentChanged']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
    // lAdd () {
    //   this.$store.dispatch('req/addDescendent')
    //     .then(res => {
    //       this.$store.commit('req/SET_DES_STATE_FLAG', 'list')
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

    <!-- <q-btn v-show="desStateFlag === 'added' || (desStateFlag !== 'new' && !contentChanged)" -->
    <q-btn v-show="'new, added, update'.includes(desStateFlag)"
      label="Voltar"
      class="bg-grey-4"
      flat
      size="xs"
      v-close-popup
      @click="$store.commit('req/SET_DES_STATE_FLAG', 'list')"
    />

    <!-- NEW -->
    <q-btn v-show="'list'.includes(desStateFlag)"
      icon="add"
      color="blue-5"
      size="xs"
      round
      @click="$store.dispatch('req/newDescendent')"
    />

    <!-- ADD -->
    <!-- <q-btn v-show="desStateFlag === 'new' && validAssociation" -->
    <q-btn v-show="'new'.includes(desStateFlag)"
      label="Adicionar"
      class="bg-grey-4"
      flat
      size="xs"
      @click="$store.dispatch('req/addDescendent')"
    />

    <q-btn v-show="'update'.includes(desStateFlag) && currentDes"
      label="Apagar"
      class="bg-grey-4"
      flat
      size="xs"
      v-close-popup
      @click="$store.dispatch('req/deleteDescendent')"
    />

    <!-- <q-btn v-show="desStateFlag === 'new' || currentDes"
      label="Cancelar"
      class="q-pa-xs bg-grey-4"
      flat
      v-close-popup
      size="xs"
      @click="$store.commit('req/SET_DES_STATE_FLAG', 'list')"
    /> -->

    <!-- <q-btn v-show="desStateFlag === 'update' && contentChanged"
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
