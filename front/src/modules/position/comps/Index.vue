<script>
import { mapState } from 'vuex'

import Search from 'src/comps/field/Search'
import BtnNew from './BtnNew'
// import Selection from 'src/comps/field/Selection'
import List from './List'

export default {
  name: 'Index',

  components: {
    Search,
    BtnNew,
    // Selection,
    List
  },

  computed: {
    ...mapState('project', ['selected']),
    ...mapState('position', ['positionSearchTerm']),

    projectList () {
      return this.$store.state.project.projects
    }
  },

  mounted () {
    this.$store.commit('SET_CURRENT_FEATURE', 'Posicionamentos', { root: true })
    this.$store.dispatch('position/initPosition')

    this.$store.commit('position/SET_ACCESSED_FROM', 'position')
  }
}
</script>

<template>
  <div class="q-ma-xs bg-grey-3">
    <!-- <Selection class="q-ml-sm"
      label="Projeto"
      :selected="selected"
      :options="projectList.map(e => ({ label: e.name, value: e.id }))"
      @input="content => $store.commit('project/SET_SELECTED', content, { root: true })"
    /> -->

    <div class="row q-mx-xs">
      <!-- :content="positionSearchTerm" -->
      <Search v-show="selected"
        :content="positionSearchTerm"
        @input="content => $store.commit('position/SET_POSITION_SEARCH_TERM', content)"
      />
      <q-space/>

      <BtnNew class="q-mt-xs" v-show="selected"/>
    </div>

    <List/>

  </div>
</template>

<style scoped lang="stylus">
</style>
