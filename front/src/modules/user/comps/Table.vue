<script>
import { mapState } from 'vuex'
import MyBtn from 'src/comps/Btn'
export default {
  name: 'Table',

  components: {
    MyBtn
  },

  computed: {
    ...mapState('user', ['users'])
  },

  data: () => ({
    visibleColumns: [],
    filterTerm: '',
    pagination: {
      sortBy: 'name',
      adescending: true,
      page: 1,
      rowsPerPage: 10
    },
    selected: {}
  }),

  created () {
    this.$store.dispatch('user/load')
    this.visibleColumns = this.users.columns.map(el => el.name).filter(el => el !== 'id')
  },

  methods: {
    myFilter (rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : ''
      return rows.filter(
        row => cols.some(col => (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1)
      )
    },

    xpto () {
      // console.log('novo')
    },

    rowClick (row) {
      this.$q.notify({
        color: 'primary',
        icon: 'delete',
        message: `Confirma a exclusão de ${row.name}?`,
        actions: [{
          label: 'Sim', handler: () => { alert('ok') }
        }, {
          label: 'Não', handler: () => { alert('ok') }
        }]
      })
    }
  }
}
</script>

<template>
  <div>
    <!-- <q-btn class="text-indigo"
      glossy rounded no-caps wait-for-ripple
      icon="add"
      label="Novo"
      @click="xpto()"/> -->

    <div>
      <q-table-columns
        label="Excolher colunas a exibir"
        v-model="visibleColumns"
        :columns="users.columns"/>
    </div>

    <div class="row">
      <div class="col">
        <q-input class="q-mt-sm text-indigo"
          inverted-light
          color="yellow-2"
          placeholder="Texto para filtrar..."
          v-model="filterTerm"/>
      </div>
    </div>

    <q-table grid class="q-mt-xs bg-yellow-2"
      inverted-light
      row-key="id"
      separator="cell"
      v-model="selected"
      :data="users.list"
      :columns="users.columns"
      :pagination="pagination"
      :visible-columns="visibleColumns"
      :loading="users.loading"
      :filter="filterTerm"
      :filter-method="myFilter">

      <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClick(props.row)" class="cursor-pointer">
        <q-td v-for="(col, idx) in props.cols" :key="idx" :props="props">
          {{ col.value }}
        </q-td>
      </q-tr>

      <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
        <q-btn
          round dense size="sm" icon="undo" color="primary" class="q-mr-sm"
          :disable="props.isFirstPage"
          @click="props.prevPage"
       />
        <div class="q-mr-sm" style="font-size: small">
          Page {{ props.pagination.page }} / {{ props.pagesNumber }}
        </div>
        <q-btn
          round dense size="sm" icon="redo" color="primary"
          :disable="props.isLastPage"
          @click="props.nextPage"
       />
      </div>

    </q-table>

      <div class="col">

        <MyBtn class="q-ml-sm"
          icon=""
          label="Colunas a exibir">

          <q-table-columns
            label=":"
            v-model="visibleColumns"
            :columns="users.columns"/>

        </MyBtn>
      </div>

  </div>
</template>

<style>

</style>
