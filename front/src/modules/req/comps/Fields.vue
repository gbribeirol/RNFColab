<script>
import { mapState, mapGetters } from 'vuex'

import InputText from 'src/comps/field/InputText'
import InputTextArea from 'src/comps/field/InputTextArea'

// import InputInt from 'src/comps/field/InputInt'
// import InputDate from 'src/comps/field/InputDate'
// import InputBoolean from 'src/comps/field/InputBoolean'
import Selection from 'src/comps/field/Selection'
import Goals from './goals'
// import Correlations from './correlation'
import Ascendent from './ascendent'
import Descendent from './descendent'
import Positions from './positions'

export default {
  name: 'Fields',

  components: {
    InputText,
    InputTextArea,
    // InputInt,
    // InputDate,
    // InputBoolean,
    Selection,
    Goals,
    // Correlations
    Ascendent,
    Descendent,
    Positions
  },

  data () {
    return {
      showJustificationOfFinalPosition: false,
      justificationOfFinalPosition: ''
    }
  },

  computed: {
    ...mapState('req', ['copy', 'reqStateFlag', 'types', 'states']),
    ...mapGetters('req', ['nonModerationgUsers', 'nonReqEngineerUsers']),
    ...mapState('position', ['positionTypes']),
    ...mapGetters('project', ['isModerator']),
    ...mapGetters('auth', ['isAdmin'])

    // projectList () {
    //   return this.$store.state.project.projects
    //   // .filter(e => e.participants.filter(p => e.id === this.$store.state.auth.user.id && p.roler === 'Eng.Requisito').length)
    // },

    // nonAscendingReqs () { return this.$store.state.req.reqs.filter(oper => oper.id !== this.copy.id) }
  },

  methods: {
    changeFinalPosition (content) {
      this.$store.commit('req/SET_FINAL_POSITION', content)
      this.showJustificationOfFinalPosition = true
    }
  }
}
</script>

<template>
  <div class="q-gutter-y-xs">
    <InputText
      label="Nome"
      :content="copy.name"
      @input="content => $store.commit('req/SET_NAME', content)"
    />

    <InputTextArea
      label="Sentença"
      :content="copy.sentence"
      @input="content => $store.commit('req/SET_SENTENCE', content)"
    />

    <!-- <div class="row" v-show="reqStateFlag === 'new'">
      <Selection class="col-6"
        label="Moderador"
        :selected="copy.moderator"
        :options="nonModerationgUsers.map(e => ({ label: e.name, value: e.id }))"
        @input="content => $store.commit('req/SET_MODERATOR', content)"
      />

      <Selection class="col-6"
        label="Eng. de requisito"
        :selected="copy.reqEngineer"
        :options="nonReqEngineerUsers.map(e => ({ label: e.name, value: e.id }))"
        @input="content => $store.commit('req/SET_REQ_ENGINEER', content)"
      />
    </div> -->

    <div class="row q-gutter-x-xs">
      <Selection
        label="Tipo"
        class="col"
        :selected="copy.type"
        :options="types.map(e => ({ label: e, value: e }))"
        @input="content => $store.commit('req/SET_TYPE', content)"
      />

      <q-select
        label="Estado"
        class="col-6"
        filled
        dense
        options-dense
        bg-color="grey-3"
        transition-show="scale"
        transition-hide="scale"
        v-model="copy.state"
        :disable="reqStateFlag === 'new'"
        :options="states.map(e => ({ label: e, value: e }))"
        @input="content => $store.commit('req/SET_STATE', content)"
      />

    </div>

    <div class="row q-gutter-x-xs">
      <InputText
        label="Eng.criador"
        class="col"
        :disable="true"
        :content="copy.engineerCreator.name"
      />

      <Selection
        label="Posição Final"
        class="col-6"
        :disable="!isAdmin && !isModerator"
        :selected="copy.finalPosition"
        :options="positionTypes.filter(e => e.label !== 'Abster-se')"
        @input="content => changeFinalPosition(content)"
      />
    </div>

    <div class="row q-gutter-x-xs">
      <InputTextArea v-show="showJustificationOfFinalPosition || justificationOfFinalPosition"
        label="Justificativa da posição final"
        class="col"
        :content="justificationOfFinalPosition"
        @input="content => $store.commit('req/SET_FD_JUSTIFICATION_OF_FINAL_POSITION', content)"
      />
    </div>

    <!-- <div class="row">
      Eng. criador: {{ copy.engineerCreator.name }}
    </div> -->

    <!-- <Selection
      label="Ascendente"
      :selected="copy.upGoal"
      :options="nonAscendingReqs.map(e => ({ label: e.name, value: e.id }))"
      @input="content => $store.commit('req/SET_UP_REQ', content)"
    /> -->

    <Goals/>
    <!-- <Correlations/> -->

    <Ascendent/>
    <Descendent/>

    <Positions/>
    <!-- <Positions v-show="reqStateFlag === 'update'"/> -->

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
