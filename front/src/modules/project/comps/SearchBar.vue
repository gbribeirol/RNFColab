<script>
import { mapState } from 'vuex'

import Search from 'src/comps/field/Search'

export default {
  name: 'SearchBar',

  components: {
    Search
  },

  computed: {
    ...mapState('project', ['projects', 'searchTerm'])
  }
}
</script>

<template>
  <section>

    <div class="row">
      <Search v-show="projects.length > 0"
        class="col q-mr-sm"
        :content="searchTerm"
        @input="content => $store.commit('project/SET_SEARCH_TERM', content)"
      />

      <q-btn
        icon="add"
        color="blue-5"
        size="sm"
        round
        @click="$store.dispatch('project/newProject')"
      />
    </div>

  </section>
</template>

<style scoped lang="stylus">
</style>
