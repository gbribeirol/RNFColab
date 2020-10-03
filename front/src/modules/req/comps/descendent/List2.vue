<script>
export default {
  name: 'Ascendent',

  props: ['req'],

  computed: {
    refinement () { return this.req.descendents.filter(e => !e.deleted && e.refinementAssociation) }
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
  <section v-show="refinement.length">

    <div class="q-pl-sm">Refinamentos</div>

    <q-table
      class="bg-grey-4"
      selection="none"
      dense
      flat
      separator="cell"
      hide-bottom
      :pagination.sync="pagination"
      :columns="columns"
      :data="refinement"
    />

  </section>
</template>

<style scoped>
</style>
