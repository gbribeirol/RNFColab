<script>
import { mapState } from 'vuex'

import Search from 'src/comps/field/Search'
// import BtnNew from './BtnNew'

export default {
  name: 'Header',

  components: {
    Search
    // BtnNew
  },

  computed: {
    ...mapState('project', ['select']),
    ...mapState('req', ['reqSearchTerm'])
  }
}
</script>

<template>
  <div class="row bg-grey-3">

    :content="reqSearchTerm"
    <Search v-show="app.select"
      class="q-ml-sm"
      :content="reqSearchTerm"
      @input="content => $store.commit('req/SET_REQ_SEARCH_TERM', content)"
    />

    <!-- <q-space/> -->

    <!-- <div class="row q-gutter-x-sm" v-show="app.select"> -->
      <!-- <BtnNew class="q-mt-xs"/> -->
      <!-- <BtnShowSummary class="q-mt-xs"/> -->
    <!-- </div> -->

  </div>
</template>

<style scoped>
</style>
