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
    ...mapState('position', ['classificationTypes']),
    ...mapState('report', ['classification', 'classificationStateFlag'])

  }
}
</script>

<template>
  <div v-show="'new, update'.includes(classificationStateFlag)">
    <Selection
      label="Classificação"
      :selected="classification.classification"
      :options="classificationTypes"
      @input="content => $store.commit('report/SET_FD_CLASSIF_CLASSIFICATION', content)"
    />

    <InputTextArea
      label="Justificativa da Classificação"
      :content="classification.justificationOfClassification"
      @input="content => $store.commit('report/SET_FD_CLASSIF_JUSTIFICATION_OF_CLASSIFICATION', content)"
    />

    <!-- <Selection v-show="!correlationAssociation"
      label="Refinamento"
      :selected="refinementAssociation"
      :options="app.refinementsTypes"
      @input="content => $store.commit('report/SET_REFINEMENT_ASSOCIATION', content)"
    /> -->

  </div>
</template>

<style scoped lang="stylus">
  .resp-container {
    report: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
</style>
