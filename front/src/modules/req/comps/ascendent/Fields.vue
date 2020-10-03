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
    ...mapState('req', ['currentAsc', 'refinementAssociation', 'ascStateFlag']),
    ...mapGetters('req', ['ascUnassociated']),
    ...mapGetters('position', ['correlationPositionTypes']),
    ...mapGetters('project', ['isModerator']),
    ...mapGetters('auth', ['isAdmin'])
  }
}
</script>

<template>
  <div v-show="'new, update'.includes(ascStateFlag)">
    <Selection
      label="Requisito"
      :selected="currentAsc.req"
      :options="ascUnassociated.map(e => ({ label: e.name, value: e.id })).sort((a, b) => a.label > b.label ? 1 : -1)"
      @input="content => $store.commit('req/SET_FD_CURRENT_ASC_REQ', content)"
    />

    <Selection v-show="!refinementAssociation"
      label="Correlação"
      class="q-mt-xs"
      :selected="currentAsc.correlationAssociation"
      :options="app.correlationTypes"
      @input="content => $store.commit('req/SET_FD_CURRENT_ASC_CORRELATION', content)"
    />

    <InputTextArea
      label="Justificativa da correlação"
      class="q-mt-xs"
      :content="currentAsc.justificationOfCorrelation"
      @input="content => $store.commit('req/SET_FD_CURRENT_ASC_JUSTIFICATION_OF_CORRELATION', content)"
    />

    <Selection v-show="ascStateFlag === 'update'"
      label="Posição Final"
      :disable="!isAdmin && !isModerator"
      :selected="currentAsc.finalPosition"
      :options="correlationPositionTypes"
      @input="content => $store.commit('req/SET_FD_CURRENT_ASC_FINAL_POSITION', content)"
    />

    <!-- <Selection v-show="!correlationAssociation"
      label="Refinamento"
      :selected="currentAsc.refinementAssociation"
      :options="app.refinementsTypes"
      @input="content => $store.commit('req/SET_FD_CURRENT_DES_REFINEMENT', content)"
    /> -->

    <!-- <InputTextArea
      label="Justificativa do refinamento"
      class="q-mt-xs"
      :content="currentAsc.justificationOfRefinement"
      @input="content => $store.commit('req/SET_FD_CURRENT_DES_JUSTIFICATION_OF_REFINEMENT', content)"
    />     -->

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
