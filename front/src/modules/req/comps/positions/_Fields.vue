<script>
import { mapState } from 'vuex'
import Selection from 'src/comps/field/Selection'

export default {
  name: 'Fields',

  components: {
    Selection
  },

  computed: {
    ...mapState('req', ['goalStateFlag', 'goal', 'copy']),

    unselectedGoals () {
      return this.$store.state.goal.list
      // .filter(e => !this.copy.goals.some(p => p.value === e.id))
    }
  }
}
</script>

<template>
<!-- v-show="'new, update'.includes(goalStateFlag)" -->
  <div >

    <Selection
      :selected="goal"
      :options="unselectedGoals.map(e => ({ label: e.name, value: e.id })).sort((a, b) => a.label > b.label ? 1 : -1)"
      @input="content => $store.commit('req/SET_FD_GOAL', content)"
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
