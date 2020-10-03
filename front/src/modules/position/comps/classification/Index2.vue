<script>
export default {
  name: 'Index2',

  props: ['classifications'],

  computed: {
    undeletedClassifications () {
      return this.classifications.filter(e => e.deleted === undefined)
    }
  },

  data () {
    return {
      columns: [
        {
          label: 'CLASSIFICAÇÕES',
          field: row => row.classification ? row.classification.label : '',
          search: true,
          visible: false,
          required: false,
          sortable: true,
          align: 'left',
          style: ''
        }, {
          label: 'PARTICIPANTE',
          field: row => row.participant.name,
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'left'
        }, {
          label: 'JUSTIFICATIVA DA CLASSIFICAÇÃO',
          field: row => row.justificationOfClassification,
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'left'
        }, {
          label: 'RETORNO DA JUSTIFICATIVA',
          field: row => row.returnOfJustification,
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'left'
        }
      ]
    }
  }

}
</script>

<template>
  <section>

    <q-table
      class="bg-grey-4"
      selection="none"
      dense
      flat
      hide-bottom
      :row-key="row => row.id"
      :columns="columns"
      :data="undeletedClassifications"
    />

  </section>
</template>

<style scoped>
</style>
