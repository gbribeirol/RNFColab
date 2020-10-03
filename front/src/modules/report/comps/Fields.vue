<script>
import { mapState, mapGetters } from 'vuex'

// import InputInt from 'src/comps/field/InputInt'
// import InputDate from 'src/comps/field/InputDate'
// import InputBoolean from 'src/comps/field/InputBoolean'
import Selection from 'src/comps/field/Selection'
import InputTextArea from 'src/comps/field/InputTextArea'
import Classification from './classification'

export default {
  name: 'Fields',

  components: {
    // InputInt,
    // InputDate,
    // InputBoolean,
    Selection,
    InputTextArea,
    Classification
  },

  computed: {
    ...mapState(['app']),
    ...mapState('report', ['copy', 'stateFlag', 'types', 'reports', 'accessedFrom']),
    ...mapGetters('report', ['nonModerationgUsers', 'nonReqEngineerUsers']),

    projectList () {
      return this.$store.state.project.projects
      // .filter(e => e.participants.filter(p => e.id === this.$store.state.auth.user.id && p.roler === 'Eng.Requisito').length)
    },

    reqList () {
      return this.$store.state.req.reqs.filter(e => e.engineerCreator.id !== this.$store.state.auth.basicUser.id)
      // .filter(e => e.participants.filter(p => e.id === this.$store.state.auth.user.id && p.roler === 'Eng.Requisito').length)
    },

    nonAscendingReqs () { return this.$store.state.req.reqs.filter(oper => oper.id !== this.copy.id) },

    correlations () {
      let requirement
      if (this.$store.state.report.copy.req) {
        requirement = this.$store.state.req.reqs.filter(e => e.id === this.$store.state.report.copy.req.value)[0]
      }

      let asc = []
      let des = []

      if (requirement) {
        if (requirement.ascendents.length) {
          asc = requirement.ascendents
            .filter(e => e.correlationAssociation)
            .map(e => ({
              label: `Asc: ${e.req.label} - ${e.correlationAssociation.label}`,
              value: e.req.value
            }))
        }

        if (requirement.descendents.length) {
          des = requirement.descendents
            .filter(e => {
              return true
            })
            .map(e => ({
              label: `Des: ${e.req.label} - ${e.correlationAssociation.label}`,
              value: e.req.value
            }))
        }
      }
      const result = asc.concat(des)
      return result
    }
  },

  methods: {
  }
}
</script>

<template>
  <div class="q-gutter-y-sm">

    <!-- <Selection v-show="accessedFrom === 'report'"
      label="Projeto"
      :selected="copy.project"
      :options="projectList.map(e => ({ label: e.name, value: e.id }))"
      @input="content => $store.commit('report/SET_PROJECT', content)"
    /> -->
    <Selection v-show="accessedFrom === 'report'"
      label="Requisito"
      :selected="copy.req"
      :options="reqList.map(e => ({ label: e.name, value: e.id })).sort((a, b) => a.label > b.label ? 1 : -1)"
      @input="content => $store.commit('report/SET_REQ', content)"
    />

    <Selection
      label="Tipo"
      :selected="copy.type || 'Requisito'"
      :options="types.map(e => ({ label: e, value: e }))"
      @input="content => $store.commit('report/SET_TYPE', content)"
    />

    <Selection v-show="copy.type === 'Correlação'"
      label="Correlações"
      :selected="copy.associatedCorrelation"
      :options="correlations"
      @input="content => $store.commit('report/SET_ASSOCIATED_CORRELATION', content)"
    />

    <Selection
      label="Posição"
      :selected="copy.report"
      :options="reports"
      @input="content => $store.commit('report/SET_REPORT', content)"
    />

    <!-- v-show="stateFlag === 'new'" -->
    <InputTextArea
      label="Argumento"
      :content="copy.argument"
      @input="content => $store.commit('report/SET_ARGUMENT', content)"
    />

    <div>
      Posicionador(a): {{ copy.participant.name }}
    </div>

    <Classification/>

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
