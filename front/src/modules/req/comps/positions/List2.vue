<script>
import { mapState, mapGetters } from 'vuex'
import PositionFields from './Fields2'
import getPositionsOfAReq from 'src/modules/position/helpers/getPositionsOfAReq'

export default {
  name: 'List',

  props: ['req'],

  components: {
    PositionFields
  },

  computed: {
    ...mapState('project', ['selected']),
    ...mapState('position', ['columns']),
    ...mapGetters('position', ['projectPositionsCalcFields', 'allDisplayColumns']),

    columnsWithoutReq () {
      return this.columns.filter(e => !'REQUISITO'.includes(e.label))
    },

    positionsOfAReq () {
      if (!this.req) {
        return []
      }

      return getPositionsOfAReq(this.projectPositionsCalcFields, this.req.id)

      // const result = this.$store.state.position.positions.filter(e =>
      //   e.construction.value === this.$store.state.project.selected.id &&
      //   e.req.value === this.req.id &&
      //   e.changed === false
      // )
      // return result
      //   .map(e => ({
      //     ...e,
      //     creationDateF: e.creationDate.substr(8, 2) + '/' + e.creationDate.substr(5, 2) + ' ' + e.creationDate.substr(11, 5)
      //   }))
      //   .sort((a, b) => a.creationDate > b.creationDate ? -1 : 1)
    }
  },

  data () {
    return {
      pagination: {
        rowsPerPage: 0
      }
    }
  },

  methods: {
  }
}
</script>

<template>
  <section v-show="positionsOfAReq.length">

    <div class="q-pl-sm">Posicionamentos</div>

    <span v-for="position in positionsOfAReq" :key="position.id">
        <!-- {{ req.name }} -->
        <PositionFields class="q-pt-xs" :position="position"/>
    </span>

    <!-- <q-table
      selection="none"
      class="bg-grey-2"
      dense
      flat
      square
      hide-bottom
      separator="cell"
      row-key="value"
      :pagination.sync="pagination"
      :data="positionsOfAReq"
      :columns="columnsWithoutReq"
      :visible-columns="allDisplayColumns"
    >

      <template v-slot:body-cell="props">
        <q-td :props="props">
          {{ props.value }}
        </q-td>
      </template>

    </q-table> -->

  </section>
</template>

<style scoped lang="stylus">
</style>
