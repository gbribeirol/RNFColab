<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'List',

  computed: {
    ...mapState('project', ['selected']),
    ...mapState('position', ['columns']),
    ...mapGetters('position', ['positionsFiltered', 'allDisplayColumns'])
  },

  data () {
    return {
      pagination: {
        rowsPerPage: 0
      }
    }
  }
}
</script>

<template>
  <section>
    <q-table v-show="positionsFiltered.length > 0"
      class="bg-grey-2"
      selection="single"
      dense
      flat
      square
      separator="cell"
      hide-bottom
      :pagination.sync="pagination"
      :data="positionsFiltered"
      :columns="columns"
      :visible-columns="allDisplayColumns"
      @selection="o => $store.dispatch('position/selectPosition', { el: o.rows[0], rota: '' })"
    />

    <div class="row q-pa-xs" v-show="selected && positionsFiltered.length <= 0">
      <q-card flat class="q-pa-sm q-pl-md">
        Nenhum conteúdo encontrado
      </q-card>
    </div>

  </section>
</template>

<style scoped lang="stylus">
</style>
