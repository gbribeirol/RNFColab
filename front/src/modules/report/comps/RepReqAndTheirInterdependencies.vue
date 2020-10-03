<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RepReqAndTheirInterdependencies',

  computed: {
    ...mapGetters('req', ['interdependencies'])
  },

  data () {
    return {
      pagination: {
        rowsPerPage: 0
      },
      columns: [{
        name: 'name', field: 'name', label: 'NOME',
        search: true,
        visible: true,
        required: true,
        sortable: true,
        align: 'left',
        style: 'max-width: 250px'
      }, {
        name: 'catalogs', field: 'catalogs', label: 'CATÁLOGOS',
        search: true,
        visible: true,
        required: true,
        sortable: true,
        align: 'left',
        style: 'max-width: 250px'
      }, {
        name: 'correlations', field: 'correlations', label: 'CORRELAÇÕES',
        search: true,
        visible: true,
        required: true,
        sortable: true,
        align: 'left'
      }, {
        name: 'refinements', field: 'refinements', label: 'REFINAMENTOS',
        search: true,
        visible: true,
        required: true,
        sortable: true,
        align: 'left'
      }]
    }
  }
}
</script>

<template>
  <section>

    <!-- <div v-for="req in interdependencies" :key="req.id">
      <ReqFields :req="req"/>
    </div> -->

    <q-table v-show="interdependencies.length"
      class="bg-grey-2"
      dense
      flat
      square
      separator="cell"
      hide-bottom
      :pagination.sync="pagination"
      :columns="columns"
      :data="interdependencies"
    >

      <template v-slot:body-cell="props">
        <q-td :props="props" v-html="props.value"/>
      </template>

    </q-table>

  </section>
</template>

<style scoped lang="stylus">
</style>
