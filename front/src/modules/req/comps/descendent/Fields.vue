<script>
import { mapState, mapGetters } from 'vuex'

import Selection from 'src/comps/field/Selection'
import InputTextArea from 'src/comps/field/InputTextArea'

export default {
  name: 'Fields',

  components: {
    Selection,
    InputTextArea
  },

  computed: {
    ...mapState(['app']),
    ...mapState('req', ['currentDes', 'correlationAssociation', 'refinementAssociation', 'desStateFlag']),
    ...mapGetters('req', ['desUnassociated'])
  }
}
</script>

<template>
  <div v-show="'new, update'.includes(desStateFlag)">

    <Selection
      label="Requisito"
      :selected="currentDes.req"
      :options="desUnassociated.map(e => ({ label: e.name, value: e.id })).sort((a, b) => a.label > b.label ? 1 : -1)"
      @input="content => $store.commit('req/SET_FD_CURRENT_DES_REQ', content)"
    />

    <!-- <Selection v-show="!refinementAssociation"
      label="Correlação"
      class="q-mt-xs"
      :selected="currentAsc.correlationAssociation"
      :options="app.correlationTypes"
      @input="content => $store.commit('req/SET_FD_CURRENT_ASC_CORRELATION', content)"
    /> -->

    <!-- <InputTextArea
      label="Justificativa da correlação"
      class="q-mt-xs"
      :content="currentAsc.justificationOfCorrelation"
      @input="content => $store.commit('req/SET_FD_CURRENT_ASC_JUSTIFICATION_OF_CORRELATION', content)"
    /> -->

    <Selection v-show="!correlationAssociation"
      label="Refinamento"
      class="q-mt-xs"
      :selected="currentDes.refinementAssociation"
      :options="app.refinementsTypes"
      @input="content => $store.commit('req/SET_FD_CURRENT_DES_REFINEMENT', content)"
    />

    <InputTextArea
      label="Justificativa do refinamento"
      class="q-mt-xs"
      :content="currentDes.justificationOfRefinement"
      @input="content => $store.commit('req/SET_FD_CURRENT_DES_JUSTIFICATION_OF_REFINEMENT', content)"
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
