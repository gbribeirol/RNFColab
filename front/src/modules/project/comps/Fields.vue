<script>
import { mapState, mapGetters } from 'vuex'

import InputText from 'src/comps/field/InputText'
import InputTextArea from 'src/comps/field/InputTextArea'
import InputInt from 'src/comps/field/InputInt'
import InputDate from 'src/comps/field/InputDate'
import InputBoolean from 'src/comps/field/InputBoolean'
import Selection from 'src/comps/field/Selection'
import Participants from './participants'

export default {
  name: 'Fields',

  components: {
    InputText,
    InputTextArea,
    InputInt,
    InputDate,
    InputBoolean,
    Selection,
    Participants
  },

  computed: {
    ...mapState('project', ['copy', 'flag', 'states']),
    ...mapGetters('project', ['nonModerationgUsers', 'nonReqEngineerUsers', 'isModerator']),
    ...mapGetters('auth', ['isAdmin']),
    ...mapGetters('req', ['reqsFiltered'])
  },

  methods: {
  }
}
</script>

<template>
  <div class="q-gutter-y-xs">

    <div class="row">
      <InputText class="col-10"
        label="Nome"
        :content="copy.name"
        @input="content => $store.commit('project/SET_FD_NAME', content)"
      />
      <InputInt class="col-2 q-pl-xs"
        label="Versão"
        :content="copy.version"
        @input="content => $store.commit('project/SET_FD_VERSION', content)"
      />
    </div>

    <InputTextArea
      label="Descrição"
      :content="copy.description"
      @input="content => $store.commit('project/SET_FD_DESCRIPTION', content)"
    />

    <div class="row">
      <InputDate class="col-6"
        label="Data início"
        :content="copy.startDate"
        @input="content => $store.commit('project/SET_FD_START_DATE', content)"
      />

      <InputDate class="col-6 q-pl-xs"
        label="Data fim"
        :content="copy.endDate"
        @input="content => $store.commit('project/SET_FD_END_DATE', content)"
      />
    </div>

    <!-- <div class="row" v-show="flag === 'new'">
      <Selection class="col-6"
        label="Moderador"
        :selected="copy.moderator"
        :options="nonModerationgUsers.map(e => ({ label: e.name, value: e.id }))"
        @input="content => $store.commit('project/SET_MODERATOR', content)"
      />

      <Selection class="col-6"
        label="Eng. de requisito"
        :selected="copy.reqEngineer"
        :options="nonReqEngineerUsers.map(e => ({ label: e.name, value: e.id }))"
        @input="content => $store.commit('project/SET_REQ_ENGINEER', content)"
      />
    </div> -->

    <div class="row">
      <Selection class="col-12"
        label="Estado"
        :disable="!isAdmin && !isModerator"
        :selected="copy.state"
        :options="states.map(e => ({ label: e.name, value: e.id }))"
        @input="content => $store.commit('project/SET_FD_STATE', content)"
      />
    </div>

    <InputText class="col-10" v-show="copy.state && copy.state.label === 'Cancelada'"
      label="Razão para cancelamento"
      :content="copy.name"
      @input="content => $store.commit('project/SET_FD_REASON_FOR_CANCELLATION', content)"
    />

    <div class="row">
      <InputBoolean class="col-6 q-pl-sm"
        label="Iniciada"
        :disable="!isAdmin"
        :content="copy.initiated"
        @input="content => $store.commit('project/SET_FD_INITIATED', content)"
      />

      <InputBoolean class="col-6 q-pl-sm"
        label="Finalizada"
        :disable="!isAdmin"
        :content="copy.finished"
        @input="content => $store.commit('project/SET_FD_FINISHED', content)"
      />
    </div>

    <Participants/>

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
