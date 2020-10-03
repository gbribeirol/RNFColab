<script>
import { mapState, mapGetters } from 'vuex'
// import { uid } from 'quasar'
// import Position from 'src/modules/position/models/Position'

export default {
  name: 'Btns',

  computed: {
    ...mapState('req', ['copy']),
    ...mapGetters('req', ['currentUserIsCreatorOfReq']),

    ...mapState('position', ['positionFlag', 'curPositionCp']),
    ...mapGetters('position', ['validPosition', 'positionChanged', 'canErasePosition', 'reqPositionedByCurrentUser']),

    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
    lGoBack () {
      this.$store.commit('position/SET_POSITION_FLAG', 'list')
    },

    // lNew () {
    //   this.$store.commit('position/SET_CUR_POSITION_CP', new Position({
    //     id: uid(),
    //     construction: this.selected,
    //     req: { label: this.copy.name, value: this.copy.id },
    //     type: 'Requisito',
    //     creationDate: this.$serverDate()
    //   }))
    //   // this.$store.commit('SET_CURRENT_FEATURE', 'Nova posição', { root: true })
    //   this.$store.commit('position/SET_POSITION_FLAG', 'new')
    //   // this.$router.push({ name: 'positionNew' })
    // },

    lAdd () {
      this.$firestore.collection('positions').doc(this.curPositionCp.id).set(this.curPositionCp).then(res => {
        this.$store.commit('position/SET_CUR_POSITION', this.curPositionCp)
        this.$store.commit('position/ADD_POSITION', this.curPositionCp)
        this.$store.commit('position/SET_POSITION_FLAG', 'list')
      })

      // this.$store.dispatch('position/addPosition')
      //   .then(res => {
      //     this.$store.commit('req/SET_GOAL_STATE_FLAG', 'list')
      //     // if (Object.keys(this.copy.file).length !== 0) {
      //     //   this.$router.push({ name: 'goal' })
      //     // }
      //   })
    },

    lChangePosition () {
      this.$store.dispatch('position/setCurPositionFromCurUserPosition')
      // this.$store.commit('position/SET_POSITION_FLAG', 'list')

      // .then(res => {
      //   if (Object.keys(this.copy.file).length !== 0) {
      //     this.$router.push({ name: 'goal' })
      //   }
      // })
    },

    lUpdate () {
      this.$store.dispatch('position/justUpdatePosition')
      this.$store.commit('position/SET_POSITION_FLAG', 'list')

      // .then(res => {
      //   if (Object.keys(this.copy.file).length !== 0) {
      //     this.$router.push({ name: 'goal' })
      //   }
      // })
    },
    // $store.dispatch('position/erasePosition')
    lErase () {
      return this.$firestore.collection('positions').doc(this.curPositionCp.id).delete()
        .then(res => {
          this.$store.commit('position/ERASE_POSITION')
          this.$store.commit('position/SET_POSITION_FLAG', 'list')
          this.$store.dispatch('req/justUpdate')
        })
    }
  }
}
</script>

<template>
  <div class="q-gutter-x-xs q-pl-xs">

    <!-- <q-btn v-show="'new, update'.includes(positionFlag) && !positionChanged" -->
    <q-btn v-show="'new, added, update'.includes(positionFlag)"
      :label="'new, update'.includes(positionFlag) && positionChanged ? 'Cancelar' : 'Voltar'"
      class="bg-grey-4"
      flat
      size="xs"
      v-close-popup
      @click="$store.commit('position/SET_POSITION_FLAG', 'list', { root: true })"
    />

    <!-- NEW -->
    <!-- <q-btn v-show="positionFlag === 'list' && !currentUserIsCreatorOfReq && !reqPositionedByCurrentUser" -->
    <q-btn v-show="'list'.includes(positionFlag) && !currentUserIsCreatorOfReq"
      icon="add"
      color="blue-5"
      size="xs"
      round
      @click="$store.dispatch('position/newPosition')"
    />

    <!-- <q-btn v-if="positionFlag === 'added' || (positionFlag !== 'new' && !positionChanged)" -->
    <!-- <q-tab-panels
      label="Voltar"
      class="q-pa-xs bg-grey-4"
      flat
      v-close-popup
      size="xs"
      @click="lGoBack"
    /> -->

    <!-- v-show="positionFlag === 'new' || !selected" -->
    <!-- <q-btn v-show="'new, update'.includes(positionFlag) && positionChanged"
      label="Cancelar"
      class="bg-grey-4"
      flat
      size="xs"
      v-close-popup
      @click="$store.commit('position/SET_POSITION_FLAG', 'list', { root: true })"
    /> -->

    <!-- <q-btn
      label="Novo"
      class="q-pa-xs bg-grey-4"
      flat
      v-close-popup
      size="xs"
      @click="$store.dispatch('req/newGoal')"
      @click="$store.dispatch('req/newGoal')"
    /> -->

    <q-btn v-show="positionFlag === 'new' && validPosition"
      label="Adicionar"
      class="bg-grey-4"
      flat
      size="xs"
      @click="$store.dispatch('position/addPosition')"
    />

    <q-btn v-show="positionFlag === 'update' && positionChanged"
      label="Salvar"
      class="bg-grey-4"
      flat
      size="xs"
      @click="lUpdate"
    />

    <q-btn v-show="canErasePosition"
      label="Apagar"
      class="bg-grey-4"
      flat
      size="xs"
      v-close-popup
      @click="lErase"
    />

  </div>
</template>

<style scoped lang="stylus">
</style>
