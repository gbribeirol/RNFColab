<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Btns',

  computed: {
    ...mapState('position', ['curPositionCp', 'classificationFlag', 'curClassification']),
    ...mapGetters('position', ['positionChanged', 'validClassification', 'isThereClassifForCurrentUser']),

    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
    lAdd () {
      this.$store.dispatch('position/addClassification')
        .then(res => {
          this.$store.commit('position/SET_CLASSIFICATION_FLAG', 'list')
          // if (Object.keys(this.curPositionCp.file).length !== 0) {
          //   this.$router.push({ name: 'goal' })
          // }
        })
    }

    // lUpdate () {
    //   this.$store.dispatch('position/updateGoal')
    //   // .then(res => {
    //   //   if (Object.keys(this.curPositionCp.file).length !== 0) {
    //   //     this.$router.push({ name: 'goal' })
    //   //   }
    //   // })
    // },
  }
}
</script>

<template>
  <div class="q-gutter-x-xs q-pl-xs">

    <!-- <q-btn v-show="classificationFlag === 'added' || (classificationFlag !== 'new' && !positionChanged)"
      label="Voltar"
      class="q-pa-xs bg-grey-4"
      flat
      v-close-popup
      size="xs"
      @click="$store.commit('SET_CLASSIFICATION_FLAG', 'list')"
    /> -->

    <!-- <q-btn v-show="positionFlag === 'list' && !reqPositionedByCurrentUser && !currentUserIsCreatorOfReq" -->
    <!-- <q-btn v-show="classificationFlag === 'list' && !curClassification && curPositionCp.participant.id !== user.id" -->
    <!-- <q-btn v-show="classificationFlag === 'list' && curPositionCp.participant.id !== user.id" -->

    <q-btn v-show="'new, added, update'.includes(classificationFlag)"
      label="Voltar"
      class="bg-grey-4"
      flat
      size="xs"
      v-close-popup
      @click="$store.commit('position/SET_CLASSIFICATION_FLAG', 'list')"
    />

    <!-- NEW -->
    <q-btn v-show="'list'.includes(classificationFlag)"
      icon="add"
      color="blue-5"
      size="xs"
      round
      @click="$store.dispatch('position/newClassification')"
    />

    <!-- <q-btn v-show="classificationFlag === 'new' || curClassification"
      label="Cancelar"
      class="bg-grey-4"
      flat
      size="xs"
      v-close-popup
      @click="$store.commit('position/SET_CLASSIFICATION_FLAG', 'list')"
    /> -->

    <!-- ADD -->
    <q-btn v-show="classificationFlag === 'new' && validClassification"
      label="Adicionar"
      class="bg-grey-4"
      flat
      size="xs"
      @click="lAdd"
    />

    <!-- <q-btn v-show="classificationFlag === 'update' && positionChanged"
      label="Salvar"
      class="q-pa-xs bg-grey-4"
      flat
      size="xs"
      @click="lUpdate"
    /> -->

    <q-btn v-show="classificationFlag === 'update'"
      label="Apagar"
      class="bg-grey-4"
      flat
      size="xs"
      v-close-popup
      @click="$store.commit('position/DELETE_CLASSIFICATION', curClassification)"
    />

  </div>
</template>

<style scoped lang="stylus">
</style>
