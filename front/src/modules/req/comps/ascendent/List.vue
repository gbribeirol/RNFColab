<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Ascendent',

  computed: {
    // ...mapState('req', ['currentAsc']),
    ...mapGetters('req', ['undeletedAsc'])
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
          name: 'req.label',
          search: true,
          visible: false,
          required: false,
          sortable: true,
          align: 'left',
          style: 'width: 250px; min-width: 250px; max-width: 250px;'
        }, {
          label: 'CORRELAÇÃO',
          field: row => row.correlationAssociation ? row.correlationAssociation.label : '',
          name: 'correlationAssociation',
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'left',
          style: 'width: 100px; min-width: 100px; max-width: 100px;'
        }, {
          label: 'FORTALECE',
          field: row => row.numberOfPositionsByType_corrs[0].value,
          name: 'strengthens',
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'center'
        }, {
          label: 'ENFRAQUECE',
          field: row => row.numberOfPositionsByType_corrs[1].value,
          name: 'weaken',
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'center'
        }, {
          label: 'AFETA',
          field: row => row.numberOfPositionsByType_corrs[2].value,
          name: 'affect',
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'center'
        }, {
          label: 'NÃO AFETA',
          field: row => row.numberOfPositionsByType_corrs[3].value,
          name: 'notAffect',
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'center'
        }, {
          label: 'ABSTER-SE',
          field: row => row.numberOfPositionsByType_corrs[4].value,
          name: 'abstain',
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'center'
        }, {
          label: 'POSIÇÃO FINAL',
          field: 'finalPosition',
          name: 'finalPosition',
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'left'
        }, {
          label: 'FORMA DECISÃO',
          field: 'originOfPosition',
          name: 'originOfPosition',
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'left'
        }, {
          label: 'JUSTIFICATIVA',
          field: 'justificationOfCorrelation',
          name: 'justificationOfCorrelation',
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'left',
          style: ''
        // }, {
        //   label: 'REFINAMENTO',
        //   field: row => row.refinementAssociation ? row.refinementAssociation.label : '',
        //   search: true,
        //   visible: true,
        //   required: true,
        //   sortable: true,
        //   align: 'left',
        //   style: 'max-width: 250px'
        }
      ]
    }
  }

  // methods: {
  //   setSelected () { this.lSelected = this.currentAsc }
  // },

  // mounted () {
  //   this.setSelected()
  // },

  // watch: {
  //   currentAsc () { this.setSelected() }
  // }
}
</script>

<template>
  <div>
    <!-- asc.strengthens = pos.filter(p => p.position.label === 'Fortalece').length
    asc.weaken = pos.filter(p => p.position.label === 'Enfraquece').length
    asc.affect = pos.filter(p => p.position.label === 'Afeta').length
    asc.notAffect = pos.filter(p => p.position.label === 'Não afeta').length
    asc.abstain = pos.filter(p => p.position.label === 'Abster-se').length    -->

    <!-- :visible-columns="allDisplayColumns" -->
    <!-- $store.commit('req/SET_CURRENT_ASC', selected) -->
    <!-- @update:selected="$store.commit('req/SET_CURRENT_ASC', lSelected)" -->
    <!-- :row-key="row => row.req.value" -->
    <!-- :selected.sync="lSelected" -->

    <div style="font-size: 10px">
      LEGENDA DE POSIÇÕES &nbsp; +: Fortalece, -: Enfraquece, ?: Afeta, /?: Não afeta, Nulo: Abstenção
    </div>

    <q-table v-show="undeletedAsc.length"
      class="q-mt-xs bg-grey-2"
      selection="single"
      dense
      flat
      separator="cell"
      hide-bottom
      :pagination.sync="pagination"
      :columns="columns"
      :data="undeletedAsc"
      @selection="o => $store.commit('req/SET_CURRENT_ASC', o.rows[0])"
    >

      <template v-slot:header="props">
          <q-th/>
          <q-th v-for="col in props.cols" :key="col.name"
            :props="props"
            :colspan="'FORTALECE'.includes(col.label) ? 5 : 0"
            v-show="!'ENFRAQUECE, AFETA, NÃO AFETA, ABSTER-SE'.includes(col.label)"
          >
            <span class="text-center" v-if="'FORTALECE'.includes(col.label)">
              POSIÇÕES<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ | - | ? | /? | Nulo
            </span>

            <span v-if="!'FORTALECE, ENFRAQUECE, AFETA, NÃO AFETA, ABSTER-SE'.includes(col.label)">
              {{ col.label }}
            </span>
          </q-th>
      </template>

      <!-- <template v-slot:header="props">
        <q-th/>
        <q-th
          v-for="col in props.cols" :key="col.name"
          :props="props"
          :colspan="'FORTALECE'.includes(col.label) ? 5 : 0"
          v-show="!'ENFRAQUECE, AFETA, NÃO AFETA, ABSTER-SE'.includes(col.label)">

          <span class="text-center" v-if="'FORTALECE'.includes(col.label)">
            POSIÇÕES<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 | 1 | 2 | 3 | Nulo
          </span>

          <span v-if="!'FORTALECE, ENFRAQUECE, AFETA, NÃO AFETA, ABSTER-SE'.includes(col.label)">
            {{ col.label }}
          </span>
        </q-th>
      </template> -->

    </q-table>
  </div>
</template>

<style scoped>
</style>
