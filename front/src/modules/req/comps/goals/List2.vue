<script>
export default {
  name: 'List',

  props: ['req'],

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
  <section>

    <div class="q-pl-sm">Catálogos</div>

    <q-table v-show="req.goals.length"
      class="bg-grey-4"
      selection="none"
      dense
      flat
      separator="cell"
      hide-bottom
      :pagination.sync="pagination"
      row-key="value.goal.value"
      :columns="columns"
      :data="req.goals.map(e => ({ label: e.goal.label, value: e, correlation: e.correlation, justification: e.justification }))"
    />

  </section>
</template>

<style scoped>
</style>
