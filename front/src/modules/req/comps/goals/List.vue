<script>
import { mapState } from 'vuex'

export default {
  name: 'List',

  computed: {
    ...mapState('req', ['copy'])
  },

  data () {
    return {
      pagination: {
        rowsPerPage: 0
      },

      columns: [
        {
          name: 'label', field: 'label', label: 'NOME',
          search: true,
          visible: false,
          required: false,
          sortable: true,
          align: 'left',
          style: 'width: 250px; min-width: 250px; max-width: 250px;'
        }, {
          label: 'CORRELAÇÃO',
          field: row => row.correlation ? row.correlation.label : '',
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'left',
          style: 'width: 100px; min-width: 100px; max-width: 100px;'
        }, {
          label: 'JUSTIFICATIVA',
          field: row => row.justification,
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
}
</script>

<template>
  <div>

    <!-- :visible-columns="allDisplayColumns" -->
    <!-- selection="multiple" -->
    <q-table v-show="copy.goals.length"
      class="q-mt-xs bg-grey-2"
      selection="single"
      dense
      flat
      separator="cell"
      hide-bottom
      :pagination.sync="pagination"
      row-key="value.goal.value"
      :columns="columns"
      :data="copy.goals.map(e => ({ label: e.goal.label, value: e, correlation: e.correlation, justification: e.justification }))"
      @selection="o => $store.commit('req/SET_CURRENT_GOAL', o.rows[0].value)"
    />

  </div>
</template>

<style scoped>
</style>
