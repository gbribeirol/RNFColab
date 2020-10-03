<script>
import { mapState, mapGetters } from 'vuex'
import Selection from 'src/comps/field/Selection'

export default {
  name: 'Fields',

  components: {
    Selection
  },

  computed: {
    ...mapState('goal', ['correlated', 'correlation', 'ascCorrelationStateFlag']),
    ...mapState(['app']),
    ...mapGetters('goal', ['uncorrelated'])
  }
}
</script>

<template>
  <div v-show="'new, update'.includes(ascCorrelationStateFlag)">

    <Selection
      label="Catálogo"
      :selected="correlated"
      :options="uncorrelated.map(e => ({ label: e.name, value: e.id })).sort((a, b) => a.label > b.label ? 1 : -1)"
      @input="content => $store.commit('goal/SET_CORRELATED', content)"
    />

    <Selection
      label="Correlação"
      :selected="correlation"
      :options="app.correlationTypes"
      @input="content => $store.commit('goal/SET_CORRELATION', content)"
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
