<script>
import { mapState, mapGetters } from 'vuex'

// import Participants from './participants'

export default {
  name: 'DisplayProject',

  props: ['project'],

  components: {
    // Participants
  },

  computed: {
    ...mapState('project', ['selected', 'flag', 'states']),
    ...mapGetters('project', ['nonModerationgUsers', 'nonReqEngineerUsers', 'isModerator']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
  }
}
</script>

<template>
  <section v-show="selected.id">

    <!-- <div class="row">
      <Display class="col-10"
        label="Nome"
        disable
        :content="project.name"
      />
      <InputInt class="col-2 q-pl-xs"
        label="Versão"
        disable
        :content="project.version"
      />
    </div> -->

    <!-- <DisplayArea
      label="Descrição"
      disable
      :content="project.description"
    /> -->
    <Display
      label="Descrição"
      :content="project.description"
    />

    <div class="row">
      <Display class="col"
        label="Data início"
        :content="project.startDateF"
      />

      <Display class="col"
        label="Data fim"
        :content="project.endDateF"
      />

      <Display class="col"
        label="Estado"
        :content="project.state ? project.state.label : ''"
      />
      <Display class="col"
        label="Iniciado"
        :content="project.initiated ? 'Sim' : 'Não'"
      />
      <Display class="col"
        label="Finalizado"
        :content="project.finished ? 'Sim' : 'Não'"
      />
    </div>

    <Display v-show="project.reasonForCancellation && project.state && project.state.label === 'Cancelada'"
      label="Razão para cancelamento"
      :content="project.reasonForCancellation"
    />

    <!-- <Participants/> -->

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
