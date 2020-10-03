<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Btns',

  computed: {
    ...mapState('goal', ['desCorrelationStateFlag', 'desCorrelationSelected']),
    ...mapGetters('goal', ['contentChanged', 'validCorrelation']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
    lAdd () {
      this.$store.dispatch('goal/addDesCorrelation')
        .then(res => {
          this.$store.commit('goal/SET_DES_CORRELATION_STATE_FLAG', 'list')
          // if (Object.keys(this.copy.file).length !== 0) {
          //   this.$router.push({ name: 'goal' })
          // }
        })
    },

    // lUpdate () {
    //   this.$store.dispatch('goal/updateGoal')
    //   // .then(res => {
    //   //   if (Object.keys(this.copy.file).length !== 0) {
    //   //     this.$router.push({ name: 'goal' })
    //   //   }
    //   // })
    // },

    lErase () {
      this.$store.dispatch('goal/eraseGoal')
      // .then(res => {
      //   this.$store.commit('goal/SET_STATE_FLAG', 'list')
      // })
    }
  }
}
</script>

<template>
  <div class="q-gutter-x-xs q-pl-xs">

    <!-- <q-btn v-show="desCorrelationStateFlag === 'added' || (desCorrelationStateFlag !== 'new' && !contentChanged)"
      label="Voltar"
      class="bg-grey-4"
      flat
      v-close-popup
      size="xs"
      @click="$store.commit('SET_DES_CORRELATION_STATE_FLAG', 'list')"
    /> -->

    <q-btn v-show="isAdmin && desCorrelationStateFlag === 'list' && !desCorrelationSelected.length"
      icon="add"
      color="blue-5"
      size="xs"
      round
      @click="$store.dispatch('goal/newDesCorrelation')"
    />

    <!-- <q-btn
      label="Novo"
      class="bg-grey-4"
      flat
      v-close-popup
      size="xs"
      @click="$store.dispatch('goal/newDesCorrelation')"
    /> -->

    <q-btn v-show="isAdmin && (desCorrelationStateFlag === 'new' || desCorrelationSelected.length)"
      label="Cancelar"
      class="bg-grey-4"
      flat
      size="xs"
      v-close-popup
      @click="$store.commit('goal/SET_DES_CORRELATION_STATE_FLAG', 'list')"
    />

    <q-btn v-show="isAdmin && desCorrelationStateFlag === 'new' && validCorrelation"
      label="Adicionar"
      class="bg-grey-4"
      flat
      size="xs"
      @click="lAdd"
    />

    <!-- <q-btn v-show="desCorrelationStateFlag === 'update' && contentChanged"
      label="Salvar"
      class="bg-grey-4"
      flat
      size="xs"
      @click="lUpdate"
    /> -->

    <q-btn v-show="isAdmin && desCorrelationStateFlag === 'list' && desCorrelationSelected.length"
      label="Apagar"
      class="bg-grey-4"
      flat
      size="xs"
      v-close-popup
      @click="$store.dispatch('goal/deleteDesCorrelation')"
    />

  </div>
</template>

<style scoped lang="stylus">
</style>
