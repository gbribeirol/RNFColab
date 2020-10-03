<script>
import { mapState } from 'vuex'
import Fields from './Fields'
import Btns from './Btns'

export default {
  name: 'Participants',

  components: {
    Fields,
    Btns
  },

  computed: {
    ...mapState('project', ['copy', 'flag', 'participantFlag', 'participantSelected'])
  },

  data () {
    return {
      pagination: {
        rowsPerPage: 0
      },

      lSelected: [],

      columns: [
        {
          name: 'name', field: 'name', label: 'NOME',
          search: true,
          visible: false,
          required: false,
          sortable: true,
          align: 'left',
          style: ''
        }, {
          name: 'roler', field: 'roler', label: 'FUNÇÃO',
          search: true,
          visible: false,
          required: false,
          sortable: true,
          align: 'left',
          style: ''
        }
      ]
    }
  },

  methods: {
    loadLSelected () { this.lSelected = this.participantSelected }
  },

  mounted () {
    this.loadLSelected()
  },

  watch: {
    participantSelected () { this.loadLSelected() }
  }
}
</script>

<template>
  <div>
<!-- v-show="'update'.includes(flag)" -->
    <q-card flat class="q-mt-md bg-grey-2">

      <div class="row bg-grey-3 q-px-sm text-subtitle1">
        <div class="text-bold">Participantes</div>
        <q-space/>
        <Btns class="text-center"/>
      </div>

      <!-- :visible-columns="allDisplayColumns" -->
      <!-- hide-bottom -->
      <!-- $store.commit('project/SET_PARTICIPANT_SELECTED', selected) -->

      <q-table v-if="'list'.includes(participantFlag)"
        class="q-mt-xs bg-grey-2"
        selection="multiple"
        dense
        flat
        square
        separator="cell"
        hide-bottom
        row-key="id"
        :pagination.sync="pagination"
        :selected.sync="lSelected"
        :data="copy.participants"
        :columns="columns"
        @update:selected="$store.commit('project/SET_PARTICIPANT_SELECTED', lSelected)"
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
