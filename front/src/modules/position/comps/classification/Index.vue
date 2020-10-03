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
    ...mapState('position', ['positionFlag', 'classificationFlag', 'curClassification']),
    ...mapGetters('position', ['undeletedClassifications', 'classifListIsReadOnly'])
  },

  data () {
    return {
      lCurClassification: null,

      columns: [
        {
          label: 'PARTICIPANTE',
          field: row => row.participant.name,
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'left'
        }, {
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
  },

  methods: {
    setLCurClassification () { this.lCurClassification = this.curClassification }
  },

  mounted () {
    this.setLCurClassification()
  },

  watch: {
    curClassification () { this.setLCurClassification() }
  }
}
</script>

<template>
  <section>

    <q-card flat class="bg-grey-2" v-show="'update'.includes(positionFlag)">
      <div class="row bg-grey-3 q-px-sm text-subtitle1">
        <div class="text-bold">Classificações</div>
        <q-space/>
        <Btns class="text-center"/>
      </div>

      <!-- :visible-columns="allDisplayColumns" -->
      <!-- hide-bottom -->
      <!-- $store.commit('position/SET_CUR_CLASSIFICATION', selected) -->
      <!-- @update:selected="$store.commit('position/SET_CUR_CLASSIFICATION', lCurClassification)" -->
        <!-- :selected.sync="lCurClassification" -->
        <!-- :selection="classifListIsReadOnly ? 'none' : 'multiple'" -->
      <q-table v-show="'list'.includes(classificationFlag) && undeletedClassifications.length"
        class="q-mt-xs bg-grey-2"
        selection="single"
        dense
        flat
        hide-bottom
        :row-key="row => row.id"
        :columns="columns"
        :data="undeletedClassifications"
        @selection="e => $store.dispatch('position/selectClassification', e.rows[0])"
      />

      <Fields v-if="'new,update'.includes(classificationFlag)"
        class="q-pt-xs"
      />
    </q-card>

  </section>
</template>

<style scoped>
/* .backgroundapp {
  background-image: url('../../../statics/backgrounds/bg-app.jpg');
  background-size: cover;
} */
</style>
