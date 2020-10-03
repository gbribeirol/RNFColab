<script>
import { mapState } from 'vuex'

import Selection from 'src/comps/field/Selection'
import InputTextArea from 'src/comps/field/InputTextArea'

export default {
  name: 'Fields',

  components: {
    Selection,
    InputTextArea
  },

  computed: {
    ...mapState('req', ['currentGoal']),
    ...mapState(['app']),

    unselectedGoals () {
      return this.$store.state.goal.list
      // .filter(e => !this.copy.goals.some(p => p.value === e.id))
    }
  }
}
</script>

<template>
  <div>

    <Selection
      label="Catálogo"
      :selected="currentGoal.goal"
      :options="unselectedGoals.map(e => ({ label: e.name, value: e.id })).sort((a, b) => a.label > b.label ? 1 : -1)"
      @input="content => $store.commit('req/SET_FD_CURRENT_GOAL_GOAL', content)"
    />

    <Selection
      label="Correlação"
      class="q-mt-xs"
      :selected="currentGoal.correlation"
      :options="app.correlationTypes"
      @input="content => $store.commit('req/SET_FD_CURRENT_GOAL_CORRELATION', content)"
    />

    <InputTextArea
      label="Justificativa"
      class="q-mt-xs"
      :content="currentGoal.justification"
      @input="content => $store.commit('req/SET_FD_CURRENT_GOAL_JUSTIFICATION', content)"
    />

  </div>
</template>

<style scoped lang="stylus">
  .resp-container {
    position: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
</style>
