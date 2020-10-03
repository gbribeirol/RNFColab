<script>
import { mapState, mapGetters } from 'vuex'
import ReqSummaryBtn from 'src/modules/req/comps/ReqSummaryBtn'
export default {
  name: 'Btns',

  components: {
    ReqSummaryBtn
  },

  computed: {
    ...mapState('project', ['flag', 'copy']),
    ...mapGetters('project', ['contentChanged', 'isModerator', 'isEngReq']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
    lAdd () {
      this.$store.dispatch('project/addProject')
        .then(res => {
          // if (Object.keys(this.copy.file).length !== 0) {
          //   this.$router.push({ name: 'project' })
          // }
        })
    },

    lUpdate () {
      this.$store.dispatch('project/updateProject')
      // .then(res => {
      //   if (Object.keys(this.copy.file).length !== 0) {
      //     this.$router.push({ name: 'project' })
      //   }
      // })
    },

    lErase () {
      this.$store.dispatch('project/eraseProject')
      // .then(res => {
      //   this.$store.commit('project/SET_FLAG', 'list')
      // })
    }
  }
}
</script>

<template>
  <div class="q-gutter-xs">

    <!-- <q-btn
      label="updateFieldToConvergeOfAProject"
      @click="$store.dispatch('position/updateFieldToConvergeOfAProject')"
    /> -->

    <q-btn v-show="flag === 'added' || (flag !== 'new' && !contentChanged)"
      label="Voltar"
      class="ip-btn bg-grey-4"
      flat
      size="sm"
      v-close-popup
      @click="$router.push({ name: 'project' })"
    />

    <q-btn v-show="flag === 'new' || contentChanged"
      label="Cancelar"
      class="ip-btn bg-grey-4"
      flat
      v-close-popup
      size="sm"
      @click="$router.push({ name: 'project' })"
    />

    <q-btn v-show="flag === 'new'"
      label="Adicionar"
      class="ip-btn bg-grey-4"
      flat
      size="sm"
      @click="lAdd"
    />

    <q-btn v-show="isAdmin && flag === 'update' && contentChanged"
      label="Salvar"
      class="ip-btn bg-grey-4"
      flat
      size="sm"
      @click="lUpdate"
    />

    <q-btn v-show="isAdmin && flag === 'update'"
      label="Apagar"
      class="ip-btn bg-grey-4"
      flat
      v-close-popup
      size="sm"
      @click="lErase"
    />

    <q-btn v-show="(isAdmin || isModerator) && flag === 'update' && !copy.initiated"
      label="Iniciar"
      class="ip-btn bg-grey-4"
      flat
      v-close-popup
      size="sm"
      @click="$store.dispatch('project/startProject')"
    />

    <q-btn v-show="(isAdmin || isModerator || isEngReq) && flag === 'update'"
      label="Enviar aviso de RNF criado"
      class="ip-btn bg-grey-4"
      flat
      v-close-popup
      size="sm"
      @click="$store.dispatch('project/sendNoticeReqCreated')"
    />

    <q-btn v-show="(isAdmin || isModerator) && flag === 'update' && !copy.finished"
      label="Finalizar"
      class="ip-btn bg-grey-4"
      flat
      v-close-popup
      size="sm"
      @click="$store.dispatch('project/finalizeProject')"
    />

    <ReqSummaryBtn/>

  </div>
</template>

<style scoped lang="stylus">
</style>
