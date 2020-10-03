<script>
import { mapState } from 'vuex'
import Selection from 'src/comps/field/Selection'

export default {
  name: 'Fields',

  components: {
    Selection
  },

  computed: {
    ...mapState('project', ['participantFlag', 'participant', 'roler', 'copy']),
    ...mapState('user', ['roleTypes']),
    ...mapState(['app']),
    unselectedUsers () {
      return this.$store.state.user.list.filter(e => !this.copy.participants.some(p => p.id === e.id))
    }
  }
}
</script>

<template>
<!-- v-show="'new, update'.includes(participantFlag)" -->
  <section>

    <Selection
      label="Usuário..."
      class="q-pt-xs"
      :selected="participant"
      :options="unselectedUsers.map(e => ({ label: e.name, value: e.id }))"
      @input="content => $store.commit('project/SET_PARTICIPANT', content)"
    />

    <Selection
      label="Função"
      class="q-py-xs"
      :selected="roler"
      :options="roleTypes.map(e => ({ label: e, value: e }))"
      @input="content => $store.commit('project/SET_ROLER', content)"
    />

  </section>
</template>

<style scoped>
</style>
