<script>
import { mapState, mapGetters } from 'vuex'

import InputText from 'src/comps/field/InputText'
// import Selection from 'src/comps/field/Selection'
import AscCorrelation from './ascCorrelation'
import DesCorrelation from './desCorrelation'

export default {
  name: 'Fields',

  components: {
    InputText,
    // Selection,
    AscCorrelation,
    DesCorrelation
  },

  computed: {
    ...mapState('goal', ['copy']),
    ...mapGetters('goal', ['goalsWithoutUpGoal'])
  }
}
</script>

<template>
  <div class="q-gutter-y-sm">

    <InputText
      label="Nome"
      :content="copy.name"
      @input="content => $store.commit('goal/SET_NAME', content)"
    />

    <!-- <InputText
      label="Descrição"
      :content="copy.description"
      @input="content => $store.commit('goal/SET_DESCRIPTION', content)"
    /> -->

    <!-- <Selection
      label="Meta ascendente"
      :selected="copy.upGoal"
      :options="goalsWithoutUpGoal.map(e => ({ label: e.name, value: e.id }))"
      @input="content => $store.commit('goal/SET_UP_GOAL', content)"
    /> -->

    <AscCorrelation/>
    <DesCorrelation/>

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
