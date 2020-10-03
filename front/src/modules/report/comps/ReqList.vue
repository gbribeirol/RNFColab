<script>
import { mapState, mapGetters } from 'vuex'
import ReqFields from 'src/modules/req/comps/Fields2'

export default {
  name: 'ReqList',

  components: {
    ReqFields
  },

  computed: {
    ...mapState('project', ['selected']),
    ...mapState('report', ['columns']),
    ...mapGetters('req', ['reqsFiltered'])
  }
}
</script>

<template>
  <section>

    <div v-for="req in reqsFiltered" :key="req.id">
      <ReqFields :req="req"/>
    </div>

    <!-- <q-table v-show="filteredReqs.length > 0"
      class="bg-grey-2"
      dense
      flat
      square
      separator="cell"
      hide-bottom
      :data="filteredReqs"
      :columns="columns"
      :visible-columns="allDisplayColumns"
      selection="single"
      @selection="o => $store.dispatch('report/selectReport', { el: o.rows[0], rota: '' })"
    />

    <div class="row q-pa-xs" v-show="selected && filteredReqs.length <= 0">
      <q-card flat class="q-pa-sm q-pl-md">
        Nenhum conteúdo encontrado
      </q-card>
    </div> -->

  </section>
</template>

<style scoped lang="stylus">
</style>
