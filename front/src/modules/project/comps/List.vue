<script>
import { mapState, mapGetters } from 'vuex'

import Search from 'src/comps/field/Search'

export default {
  name: 'List',

  components: {
    Search
  },

  computed: {
    ...mapState('project', ['projects', 'flag', 'searchTerm', 'columns']),
    ...mapGetters('project', ['projectsFiltered', 'allDisplayColumns']),
    ...mapGetters('auth', ['isAdmin'])
  }
}
</script>

<template>
  <section>

    <div v-show="projects.length" class="row bg-grey-3">
      <Search
        class="col q-mr-sm"
        :content="searchTerm"
        @input="content => $store.commit('project/SET_SEARCH_TERM', content)"
      />

      <q-btn v-show="isAdmin"
        icon="add"
        class="q-mt-xs q-mr-xs"
        color="blue-5"
        size="sm"
        round
        @click="$store.dispatch('project/newProject')"
      />
    </div>

    <q-table v-show="projectsFiltered.length"
      class="bg-grey-2"
      dense
      flat
      square
      separator="cell"
      hide-bottom
      :data="projectsFiltered"
      :columns="columns"
      :visible-columns="allDisplayColumns"
      selection="single"
      @selection="e => $store.dispatch('project/selectProject', e.rows[0])"
    />

  </section>
</template>

<style scoped lang="stylus">
</style>
