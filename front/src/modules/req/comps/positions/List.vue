<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'List',

  computed: {
    ...mapState('project', ['selected']),
    ...mapState('position', ['columns']),
    ...mapGetters('position', ['positionsOfAReq', 'allDisplayColumns']),

    columnsWithoutReq () {
      // return this.columns.filter(e => !'REQUISITO, ARGUMENTO'.includes(e.label))
      return this.columns.filter(e => !'REQUISITO'.includes(e.label))
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
  <div>

    <!-- -{{ positionsOfAReq }}- -->

    <!-- v-show="positionsOfAReq.length" -->
    <q-table v-show="selected && positionsOfAReq.length > 0"
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
      selection="single"
      @selection="o => $store.dispatch('position/selectPosition', { el: o.rows[0], rota: 'req.Edit' })"
    >

        <template v-slot:body-cell="props">
          <q-td :props="props" :style="props.row.curUserHasClassification ? 'color: #4682B4' : ''">
            {{ props.value }}
          </q-td>
        </template>

      <!-- <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template> -->

      <!-- <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn class="q-ma-none q-pa-none" color="green" dense icon="touch_app" flat
              @click="sxdfsdfd(props.row.classifications[0])"
            />
            <q-btn class="q-ma-none q-pa-none" color="red" dense icon="delete" flat
              @click="props.expand = !props.expand"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
      </template> -->

    </q-table>

    <div class="row q-pa-xs" v-show="selected && positionsOfAReq.length <= 0">
      <q-card flat class="q-pa-sm q-pl-md bg-grey-2">
        Nenhum conteúdo encontrado
      </q-card>
    </div>

  </div>
</template>

<style scoped lang="stylus">
</style>
