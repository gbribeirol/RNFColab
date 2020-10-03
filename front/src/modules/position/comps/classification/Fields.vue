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
    ...mapState('position', ['curClassification', 'classificationFlag', 'classificationTypes'])
  }
}
</script>

<template>
  <section>

    <div v-show="'new, update'.includes(classificationFlag)" class="q-gutter-y-xs">
      <Selection
        label="Classificação"
        :selected="curClassification.classification"
        :options="classificationTypes"
        @input="content => $store.commit('position/SET_FD_CUR_CLASSIF_CLASSIFICATION', content)"
      />

      <InputTextArea
        label="Justificativa da Classificação"
        :content="curClassification.justificationOfClassification"
        @input="content => $store.commit('position/SET_FD_CUR_CLASSIF_JUSTIFICATION', content)"
      />

      <InputTextArea
        label="Retorno da Justificativa"
        :content="curClassification.returnOfJustification"
        @input="content => $store.commit('position/SET_FD_CUR_CLASSIF_RETURN_OF_JUSTIFICATION', content)"
      />

      <!-- <Selection v-show="!correlationAssociation"
        label="Refinamento"
        :selected="refinementAssociation"
        :options="app.refinementsTypes"
        @input="content => $store.commit('position/SET_REFINEMENT_ASSOCIATION', content)"
      /> -->
    </div>

  </section>
</template>

<style scoped lang="stylus">
  .resp-container {
    position: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
</style>
