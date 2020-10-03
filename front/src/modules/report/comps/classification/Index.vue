<script>
import { mapState, mapGetters } from 'vuex'
import Fields from './Fields'
import Btns from './Btns'

export default {
  name: 'Ascendent',

  components: {
    Fields,
    Btns
  },

  computed: {
    ...mapState('report', ['copy', 'stateFlag', 'classification', 'classificationStateFlag', 'selectedClassifications']),
    ...mapGetters('report', ['undeletedClassifications', 'classifListIsReadOnly'])
  },

  data () {
    return {
      lSelectedClassifications: [],

      columns: [
        {
          label: 'CLASSIFICAÇÃO',
          field: row => row.classification ? row.classification.label : '',
          search: true,
          visible: false,
          required: false,
          sortable: true,
          align: 'left',
          style: ''
        }, {
          label: 'JUSTIFICATIVA DA CLASSIFICAÇÃO',
          field: row => row.justificationOfClassification,
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'left'
        }, {
          label: 'PARTICIPANTE',
          field: row => row.participant.name,
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'left'
        }
      ]
    }
  },

  methods: {
    loadlSelectedClassifications () { this.lSelectedClassifications = this.selectedClassifications }
  },

  mounted () {
    this.loadlSelectedClassifications()
  },

  watch: {
    selectedClassifications () { this.loadlSelectedClassifications() }
  }
}
</script>

<template>
  <div>
<!-- {{ undeletedClassifications }} -->
    <q-card flat class="q-mt-md bg-grey-2" v-show="'update'.includes(stateFlag)">
      <div class="row bg-grey-3 q-px-sm text-subtitle1">
        <div class="text-bold">Classificações</div>
        <q-space/>
        <Btns class="text-center"/>
      </div>

      <!-- :visible-columns="allDisplayColumns" -->
      <!-- hide-bottom -->
      <!-- $store.commit('report/SET_SELECTED_CLASSIFICATIONS', selected) -->
      <q-table v-show="'list'.includes(classificationStateFlag) && undeletedClassifications.length > 0"
        class="q-mt-xs bg-grey-2"
        :selection="classifListIsReadOnly ? 'none' : 'multiple'"
        dense
        flat
        hide-bottom
        :row-key="row => row.id"
        :columns="columns"
        :selected.sync="lSelectedClassifications"
        :data="undeletedClassifications"
        @update:selected="$store.commit('report/SET_SELECTED_CLASSIFICATIONS', lSelectedClassifications)"
      />
      <Fields v-if="'new,update'.includes(classificationStateFlag)"
        class="q-px-sm"
      />
    </q-card>

  </div>
</template>

<style scoped>
/* .backgroundapp {
  background-image: url('../../../statics/backgrounds/bg-app.jpg');
  background-size: cover;
} */
</style>
