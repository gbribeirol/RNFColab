<script>
import { mapState, mapGetters } from 'vuex'

import Search from 'src/comps/field/Search'

export default {
  name: 'List',

  components: {
    Search
  },

  computed: {
    ...mapState('project', ['selected']),
    ...mapState('req', ['reqs', 'copy', 'columns', 'reqSearchTerm']),
    ...mapGetters('req', ['reqsFiltered', 'allDisplayColumns'])
  },

  data () {
    return {
      pagination: {
        rowsPerPage: 0
      }
    }
  }
}
</script>

<template>
  <section>

    <Search v-show="selected.id"
      :content="reqSearchTerm"
      @input="content => $store.commit('req/SET_REQ_SEARCH_TERM', content)"
    />

    <div v-show="reqsFiltered.length">
      <div class="bg-grey-2 q-py-md">
        LEGENDA DE POSIÇÕES &nbsp; 0: Descartável, 1: Desejável, 2: Essencial, Nulo: Abstenção
      </div>

      <q-table v-show="reqsFiltered.length"
        class="bg-grey-2"
        selection="single"
        dense
        flat
        square
        separator="cell"
        hide-bottom
        :pagination.sync="pagination"
        :columns="columns"
        :data="reqsFiltered"
        :visible-columns="allDisplayColumns"
        @selection="o => $store.dispatch('req/selectReq', o.rows[0])"
      >
        <template v-slot:header="props">
            <q-th/>
            <q-th
              v-for="col in props.cols" :key="col.name"
              :props="props" :colspan="'DESCARTÁVEIS'.includes(col.label) ? 4 : 0"
              v-show="!'DESEJÁVEIS, ESSENCIAIS, ABSTENÇÕES'.includes(col.label)">

              <span class="text-center" v-if="'DESCARTÁVEIS'.includes(col.label)">
                POSIÇÕES<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 | 1 | 2 | Nulo
              </span>
                <!-- Descar.Desej.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Essen.Absten. -->

              <!-- <span v-show="'DESCARTÁVEIS, DESEJÁVEIS, ESSENCIAIS, ABSTENÇÕES'.includes(col.label)">
                <span style="font-size: 7px">
                  {{ col.label }}
                </span>
              </span> -->

              <span v-if="!'DESCARTÁVEIS, DESEJÁVEIS, ESSENCIAIS, ABSTENÇÕES'.includes(col.label)">
                {{ col.label }}
              </span>
            </q-th>
        </template>

        <template v-slot:body-cell="props">
          <q-td :props="props" :style="props.row.curUserHasPosition ? 'color: #4682B4' : ''">
            {{ props.value }}
          </q-td>
        </template>

      </q-table>
    </div>

  </section>
</template>

<style scoped>
</style>
