<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Btns',

  computed: {
    ...mapState('req', ['goalStateFlag', 'currentGoal']),
    ...mapGetters('req', ['validAssociationGoal'])
  }
}
</script>

<template>
  <div class="q-gutter-x-xs q-pl-xs">

    <q-btn v-show="'new, added, update'.includes(goalStateFlag)"
      label="Voltar"
      class="bg-grey-4"
      flat
      size="xs"
      v-close-popup
      @click="$store.commit('req/SET_GOAL_STATE_FLAG', 'list')"
    />

    <!-- NEW -->
    <q-btn v-show="'list'.includes(goalStateFlag)"
      icon="add"
      color="blue-5"
      size="xs"
      round
      @click="$store.dispatch('req/newGoal')"
    />

    <!-- ADD -->
    <q-btn v-show="goalStateFlag === 'new' && validAssociationGoal"
      label="Adicionar"
      class="bg-grey-4"
      flat
      size="xs"
      @click="$store.dispatch('req/addGoal')"
    />

    <q-btn v-show="'update'.includes(goalStateFlag) && currentGoal"
      label="Apagar"
      class="bg-grey-4"
      flat
      size="xs"
      v-close-popup
      @click="$store.dispatch('req/deleteGoal')"
    />

  </div>
</template>

<style scoped lang="stylus">
</style>
