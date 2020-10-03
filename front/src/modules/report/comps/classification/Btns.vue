<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Btns',

  computed: {
    ...mapState('report', ['copy', 'classificationStateFlag', 'selectedClassifications']),
    ...mapGetters('report', ['contentChanged', 'validClassification', 'isThereClassifForCurrentUser']),

    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
    lAdd () {
      this.$store.dispatch('report/addClassification')
        .then(res => {
          this.$store.commit('report/SET_CLASSIF_STATE_FLAG', 'list')
          // if (Object.keys(this.copy.file).length !== 0) {
          //   this.$router.push({ name: 'goal' })
          // }
        })
    },

    // lUpdate () {
    //   this.$store.dispatch('report/updateGoal')
    //   // .then(res => {
    //   //   if (Object.keys(this.copy.file).length !== 0) {
    //   //     this.$router.push({ name: 'goal' })
    //   //   }
    //   // })
    // },

    lErase () {
      this.$store.dispatch('report/eraseGoal')
      // .then(res => {
      //   this.$store.commit('report/SET_STATE_FLAG', 'list')
      // })
    }
  }
}
</script>

<template>
  <div class="q-gutter-x-xs q-pl-xs">

    <!-- <q-btn v-show="classificationStateFlag === 'added' || (classificationStateFlag !== 'new' && !contentChanged)"
      label="Voltar"
      class="q-pa-xs bg-grey-4"
      flat
      v-close-popup
      size="xs"
      @click="$store.commit('SET_CLASSIF_STATE_FLAG', 'list')"
    /> -->

    <!-- <q-btn v-show="stateFlag === 'list' && !reqReportedByCurrentUser && !currentUserIsCreatorOfReq" -->
    <!-- <q-btn v-show="classificationStateFlag === 'list' && !selectedClassifications.length && copy.participant.id !== user.id" -->
    <!-- <q-btn v-show="classificationStateFlag === 'list' && copy.participant.id !== user.id" -->
    <q-btn v-show="!isThereClassifForCurrentUser"
      icon="add"
      color="blue-5"
      size="xs"
      round
      @click="$store.dispatch('report/newClassification')"
    />

    <q-btn v-show="classificationStateFlag === 'new' || selectedClassifications.length"
      label="Cancelar"
      class="q-pa-xs bg-grey-4"
      flat
      v-close-popup
      size="xs"
      @click="$store.commit('report/SET_CLASSIF_STATE_FLAG', 'list')"
    />

    <q-btn v-show="classificationStateFlag === 'new' && validClassification"
      label="Adicionar"
      class="q-pa-xs bg-grey-4"
      flat
      size="xs"
      @click="lAdd"
    />

    <!-- <q-btn v-show="classificationStateFlag === 'update' && contentChanged"
      label="Salvar"
      class="q-pa-xs bg-grey-4"
      flat
      size="xs"
      @click="lUpdate"
    /> -->

    <q-btn v-show="classificationStateFlag === 'list' && selectedClassifications.length"
      label="Apagar"
      class="q-pa-xs bg-grey-4"
      flat
      v-close-popup
      size="xs"
      @click="$store.dispatch('report/deleteClassification')"
    />

  </div>
</template>

<style scoped lang="stylus">
</style>
