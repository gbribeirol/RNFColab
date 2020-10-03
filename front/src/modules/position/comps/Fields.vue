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
    ...mapState('position', ['curPositionCp', 'positionFlag', 'types', 'positionTypes', 'accessedFrom']),
    ...mapGetters('position', ['nonModerationgUsers', 'nonReqEngineerUsers', 'correlationPositionTypes']),

    projectList () {
      return this.$store.state.project.projects
      // .filter(e => e.participants.filter(p => e.id === this.$store.state.auth.user.id && p.roler === 'Eng.Requisito').length)
    },

    reqList () {
      return this.$store.state.req.reqs.filter(e => e.engineerCreator.id !== this.$store.state.auth.basicUser.id)
      // .filter(e => e.participants.filter(p => e.id === this.$store.state.auth.user.id && p.roler === 'Eng.Requisito').length)
    },

    nonAscendingReqs () { return this.$store.state.req.reqs.filter(oper => oper.id !== this.curPosition.id) },

    correlations () {
      if (!this.$store.state.position.curPositionCp.req) {
        return []
      }

      const req = this.$store.state.req.reqs.filter(e => e.id === this.$store.state.position.curPositionCp.req.value)[0]

      const asc = req.ascendents
        .filter(e => e.correlationAssociation)
        .map(e => ({
          label: `${e.req.label} - ${e.correlationAssociation.label}`,
          value: e.req.value
        }))

      // let des = req.descendents
      //   .filter(e => e.correlationAssociation)
      //   .map(e => ({
      //     label: `${e.req.label} - ${e.correlationAssociation.label}`,
      //     value: e.req.value
      //   }))

      return asc // asc.concat(des)
    }
  }
}
</script>

<template>
  <section>

    <div :class="(curPositionCp.participant.id === $store.state.auth.basicUser.id) ? 'q-gutter-y-xs' : '' ">

      <!-- :disable="curPositionCp.participant.id !== $store.state.auth.basicUser.id" -->

      <Selection
        label="Tipo"
        :disable="positionFlag !== 'new'"
        :selected="curPositionCp.type"
        :options="types.map(e => ({ label: e, value: e }))"
        @input="content => $store.commit('position/SET_FD_CUR_POS_TYPE', content)"
      />

      <Selection v-show="curPositionCp.type === 'Correlação'"
        label="Correlação"
        :disable="positionFlag !== 'new'"
        :selected="curPositionCp.associatedCorrelation"
        :options="correlations"
        @input="content => $store.commit('position/SET_FD_CUR_POS_ASSOCIATED_CORRELATION', content)"
      />

      <Selection
        label="Posição"
        :disable="positionFlag !== 'new'"
        :selected="curPositionCp.position"
        :options="curPositionCp.type === 'Requisito' ? positionTypes : correlationPositionTypes"
        @input="content => $store.commit('position/SET_FD_CUR_POS_POSITION', content)"
      />

      <!-- v-show="positionFlag === 'new'" -->
      <InputTextArea
        label="Argumento"
        :disable="positionFlag !== 'new'"
        :content="curPositionCp.argument"
        @input="content => $store.commit('position/SET_FD_CUR_POS_ARGUMENT', content)"
      />

      <div v-show="curPositionCp && curPositionCp.participant">
        <!-- Posicionador(a): {{ curPositionCp.participant.name }} -->
      </div>

    </div>

    <Classification class="q-mt-sm"/>

  </section>
</template>

<style scoped>
</style>
