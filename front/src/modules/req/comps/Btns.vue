<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Btns',

  computed: {
    ...mapState('req', ['reqStateFlag']),
    ...mapGetters('req', ['contentChanged', 'currentUserIsCreatorOfReq']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
    lAdd () {
      this.$store.dispatch('req/addReq')
        .then(res => {
          // if (Object.keys(this.copy.file).length !== 0) {
          //   this.$router.push({ name: 'req' })
          // }
        })
    },

    lUpdate () {
      this.$store.dispatch('req/updateReq')
      // .then(res => {
      //   if (Object.keys(this.copy.file).length !== 0) {
      //     this.$router.push({ name: 'req' })
      //   }
      // })
    },

    lErase () {
      this.$store.dispatch('req/eraseReq')
      // .then(res => {
      //   this.$store.commit('req/SET_REQ_STATE_FLAG', 'list')
      // })
    }
  }
}
</script>

<template>
  <div class="q-gutter-x-sm">

    <q-btn v-show="reqStateFlag === 'added' || (reqStateFlag !== 'new' && !contentChanged)"
      label="Voltar"
      class="ip-btn bg-grey-4"
      flat
      v-close-popup
      size="sm"
      @click="$router.push({ name: 'req' })"
    />

    <q-btn v-show="reqStateFlag === 'new' || contentChanged"
      label="Cancelar"
      class="ip-btn bg-grey-4"
      flat
      v-close-popup
      size="sm"
      @click="$router.push({ name: 'req' })"
    />

    <q-btn v-show="reqStateFlag === 'new'"
      label="Adicionar"
      class="ip-btn bg-grey-4"
      flat
      size="sm"
      @click="lAdd"
    />

    <q-btn v-show="reqStateFlag === 'update' && contentChanged"
      label="Salvar"
      class="ip-btn bg-grey-4"
      flat
      size="sm"
      @click="lUpdate"
    />

    <q-btn v-show="(isAdmin || currentUserIsCreatorOfReq) && reqStateFlag === 'update'"
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
