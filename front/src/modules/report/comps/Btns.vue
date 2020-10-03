<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Btns',

  computed: {
    ...mapState('report', ['stateFlag']),
    ...mapGetters('report', ['contentChanged', 'validReport', 'canErase']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
    lAdd () {
      this.$store.dispatch('report/addReport')
        .then(res => {
          // if (Object.keys(this.copy.file).length !== 0) {
          //   this.$router.push({ name: 'report' })
          // }
        })
    },

    lUpdate () {
      this.$store.dispatch('report/updateReport')
      // .then(res => {
      //   if (Object.keys(this.copy.file).length !== 0) {
      //     this.$router.push({ name: 'report' })
      //   }
      // })
    },

    lErase () {
      this.$store.dispatch('report/eraseReport')
      // .then(res => {
      //   this.$store.commit('report/SET_STATE_FLAG', 'list')
      // })
    }
  }

}
</script>

<template>
  <div class="q-gutter-x-sm">

    <q-btn v-show="stateFlag === 'added' || (stateFlag !== 'new' && !contentChanged)"
      label="Voltar"
      class="ip-btn bg-grey-4"
      flat
      v-close-popup
      size="sm"
      @click="$router.push({ name: 'report' })"
    />

    <q-btn v-show="stateFlag === 'new' || contentChanged"
      label="Cancelar"
      class="ip-btn bg-grey-4"
      flat
      v-close-popup
      size="sm"
      @click="$router.push({ name: 'report' })"
    />

    <q-btn v-show="stateFlag === 'new' && validReport"
      label="Adicionar"
      class="ip-btn bg-grey-4"
      flat
      size="sm"
      @click="lAdd"
    />

    <q-btn v-show="stateFlag === 'update' && contentChanged"
      label="Salvar"
      class="ip-btn bg-grey-4"
      flat
      size="sm"
      @click="lUpdate"
    />

    <q-btn v-show="canErase"
      label="Apagar"
      class="ip-btn bg-grey-4"
      flat
      v-close-popup
      size="sm"
      @click="lErase"
    />

  </div>
</template>

<style scoped lang="stylus">
</style>
