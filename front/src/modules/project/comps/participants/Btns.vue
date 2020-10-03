<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Btns',

  computed: {
    ...mapState('project', ['participantFlag', 'participantSelected']),
    ...mapGetters('project', ['contentChanged', 'validParticipant']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
    lAdd () {
      this.$store.dispatch('project/addParticipant')
        .then(res => {
          this.$store.commit('project/SET_PARTICIPANT_FLAG', 'list')
          // if (Object.keys(this.copy.file).length !== 0) {
          //   this.$router.push({ name: 'goal' })
          // }
        })
    },

    lUpdate () {
      this.$store.dispatch('project/updateGoal')
      // .then(res => {
      //   if (Object.keys(this.copy.file).length !== 0) {
      //     this.$router.push({ name: 'goal' })
      //   }
      // })
    },

    lErase () {
      this.$store.dispatch('project/eraseGoal')
      // .then(res => {
      //   this.$store.commit('project/SET_FLAG', 'list')
      // })
    }
  }
}
</script>

<template>
  <div class="q-gutter-x-xs q-pl-xs">

    <!-- <q-btn v-show="participantFlag === 'added' || (participantFlag !== 'new' && !contentChanged)"
      label="Voltar"
      class="bg-grey-4"
      flat
      v-close-popup
      size="xs"
      @click="$store.commit('SET_PARTICIPANT_FLAG', 'list')"
    /> -->

    <q-btn v-show="isAdmin && participantFlag === 'list'"
      icon="add"
      color="blue-5"
      size="xs"
      round
      @click="$store.dispatch('project/newParticipant')"
    />

    <!-- <q-btn
      label="Novo"
      class="q-pa-xs bg-grey-4"
      flat
      v-close-popup
      size="xs"
      @click="$store.dispatch('project/newParticipant')"
      @click="$store.dispatch('project/newParticipant')"
    /> -->

    <q-btn v-show="participantFlag === 'new' || participantSelected.length"
      label="Cancelar"
      class="bg-grey-4"
      flat
      v-close-popup
      size="xs"
      @click="$store.commit('project/SET_PARTICIPANT_FLAG', 'list')"
    />

    <q-btn v-show="participantFlag === 'new' && validParticipant"
      label="Adicionar"
      class="bg-grey-4"
      flat
      size="xs"
      @click="lAdd"
    />

    <q-btn v-show="participantFlag === 'update' && contentChanged"
      label="Salvar"
      class="bg-grey-4"
      flat
      size="xs"
      @click="lUpdate"
    />

    <q-btn v-show="participantFlag === 'list' && participantSelected.length"
      label="Apagar"
      class="bg-grey-4"
      flat
      v-close-popup
      size="xs"
      @click="$store.dispatch('project/deleteParticipant')"
    />

  </div>
</template>

<style scoped lang="stylus">
</style>
