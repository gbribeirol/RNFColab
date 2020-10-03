<script>
import { mapState, mapGetters } from 'vuex'
import Fields from './Fields'
import Btns from './Btns'

export default {
  name: 'Correlation',

  components: {
    Fields,
    Btns
  },

  computed: {
    ...mapState('goal', ['copy', 'stateFlag', 'desCorrelationStateFlag', 'desCorrelationSelected']),
    ...mapGetters('goal', ['undeletedDes'])
  },

  data () {
    return {
      lSelected: [],

      columns: [
        {
          field: row => row.meta.label, label: 'META FLEXÍVEL',
          search: true,
          visible: false,
          required: false,
          sortable: true,
          align: 'left',
          style: ''
        }, {
          field: row => row.correlation.label, label: 'CORRELAÇÃO',
          search: true,
          visible: true,
          required: true,
          sortable: true,
          align: 'left',
          style: 'max-width: 250px'
        }
      ],
      pagination: {
        rowsPerPage: 0
      }
    }
  },

  methods: {
    loadLSelected () { this.lSelected = this.desCorrelationSelected }
  },

  mounted () {
    this.loadLSelected()
  },

  watch: {
    desCorrelationSelected () { this.loadLSelected() }
  }
}
</script>

<template>
  <div>

    <q-card flat class="q-mt-md bg-grey-2" v-show="'update'.includes(stateFlag)">
      <div class="row bg-grey-3 q-px-sm text-subtitle1">
        <div class="text-bold">Descendente</div>
        <q-space/>
        <Btns class="text-center"/>
      </div>

      <!-- :visible-columns="allDisplayColumns" -->
      <!-- hide-bottom -->
      <!-- $store.commit('goal/SET_DES_CORRELATION_SELECTED', selected) -->
      <q-table v-if="'list'.includes(desCorrelationStateFlag) && undeletedDes.length"
        class="q-mt-xs bg-grey-2"
        selection="multiple"
        dense
        flat
        hide-bottom
        :pagination.sync="pagination"
        :row-key="row => row.meta.label"
        :selected.sync="lSelected"
        :data="undeletedDes"
        :columns="columns"
        @update:selected="$store.commit('goal/SET_DES_CORRELATION_SELECTED', lSelected)"
      />
      <Fields v-else
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
