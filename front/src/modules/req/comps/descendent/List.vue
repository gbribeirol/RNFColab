<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Ascendent',

  computed: {
    // ...mapState('req', ['currentDes']),
    ...mapGetters('req', ['undeletedDes'])
  },

  data () {
    return {
      pagination: {
        rowsPerPage: 0
      },

      // lSelected: [],

      columns: [
        {
          label: 'REQUISITO',
          field: row => row.req ? row.req.label : '',
          search: true,
          visible: false,
          required: false,
          sortable: true,
          align: 'left',
          style: 'width: 250px; min-width: 250px; max-width: 250px;'
        // }, {
        //   label: 'CORRELAÇÃO',
        //   field: row => row.correlationAssociation ? row.correlationAssociation.label : '',
        //   search: true,
        //   visible: true,
        //   required: true,
        //   sortable: true,
        //   align: 'left',
        //   style: ''
        }, {
          label: 'REFINAMENTO',
          field: row => row.refinementAssociation ? row.refinementAssociation.label : '',
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'left',
          style: 'width: 100px; min-width: 100px; max-width: 100px;'
        }, {
          label: 'JUSTIFICATIVA',
          field: row => row.justificationOfRefinement,
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'left',
          style: ''
        }
      ]
    }
  }

  // methods: {
  //   setSelected () { this.lSelected = this.currentDes }
  // },

  // mounted () {
  //   this.setSelected()
  // },

  // watch: {
  //   currentDes () { this.setSelected() }
  // }
}
</script>

<template>
  <section>

    <!-- :visible-columns="allDisplayColumns" -->
    <!-- $store.commit('req/SET_CURRENT_ASC', selected) -->
    <!-- @update:selected="$store.commit('req/SET_CURRENT_ASC', lSelected)" -->
    <!-- :row-key="row => row.req.value" -->
    <!-- :selected.sync="lSelected" -->
    <q-table v-show="undeletedDes.length"
      class="q-mt-xs bg-grey-2"
      selection="single"
      dense
      flat
      separator="cell"
      hide-bottom
      :pagination.sync="pagination"
      :columns="columns"
      :data="undeletedDes"
      @selection="o => $store.commit('req/SET_CURRENT_DES', o.rows[0])"
    />

  </section>
</template>

<style scoped>
</style>
