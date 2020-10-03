<script>
import { mapState } from 'vuex'

import FdSelectProject from 'src/modules/project/comps/FdSelectProject'
import FdSelectReport from 'src/modules/report/comps/FdSelectReport'
import DisplayProject from 'src/modules/project/comps/DisplayProject'
import Search from 'src/comps/field/Search'
import ReqList from './ReqList'
import RepReqAndTheirInterdependencies from './RepReqAndTheirInterdependencies'
import RepScoreOfParticipants from './RepScoreOfParticipants'
import ListPosts from 'src/modules/mural/comps/ListPosts'

export default {
  name: 'Index',

  components: {
    FdSelectProject,
    FdSelectReport,
    DisplayProject,
    Search,
    ReqList,
    RepReqAndTheirInterdependencies,
    RepScoreOfParticipants,
    ListPosts
  },

  computed: {
    ...mapState('project', ['selected']),
    ...mapState('req', ['reqSearchTerm']),
    ...mapState('report', ['selectedReport'])
  },

  mounted () {
    this.$store.commit('SET_CURRENT_FEATURE', 'Relatórios', { root: true })
  }
}
</script>

<template>
  <section class="q-pa-xs q-gutter-y-xs">

    <div>
      <FdSelectProject/>

      <FdSelectReport/>

      <Search
        label="Busca requisito"
        :content="reqSearchTerm"
        @input="content => $store.commit('req/SET_REQ_SEARCH_TERM', content)"
      />
    </div>

    <div v-show="selected.id" class="bg-grey-3 q-px-sm text-subtitle1">
      <span class="text-bold">
        Projeto
      </span>

      <DisplayProject class="q-pb-xs" :project="selected"/>
    </div>

    <div v-if="selected.id && selectedReport === 'Histórico das Discussões'" class="bg-grey-3 q-px-sm text-subtitle1">
      <span class="text-bold">
        Requisitos
      </span>
      <ReqList/>

      <div class="text-bold q-pt-md">
        Posts do mural
      </div>
      <ListPosts/>
    </div>

    <div v-if="selected.id && selectedReport === 'Requisitos e suas Correlações/Refinamentos'" class="bg-grey-3 q-px-sm text-subtitle1">
      <span class="text-bold">
        Requisitos
      </span>

      <RepReqAndTheirInterdependencies/>
    </div>

    <div v-if="selected.id && selectedReport === 'Pontuação dos Participantes'" class="bg-grey-3 q-px-sm text-subtitle1">
      <RepScoreOfParticipants/>
    </div>

  </section>
</template>

<style scoped lang="stylus">
</style>
