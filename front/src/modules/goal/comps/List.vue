<script>
import { mapState, mapGetters } from 'vuex'

// import Item from './Item'
// import Search from './Search'
import Search from 'src/comps/field/Search'
// import FieldsForDisplay from './FieldsForDisplay'
import BtnDiagram from './diagram/Btn'

export default {
  name: 'Index',

  // props: {
  //   selectFieldsToDisplay: { type: Boolean, default: false }
  // },

  components: {
    Search,
    // FieldsForDisplay,
    BtnDiagram
    // Item
  },

  data () {
    return {
      pagination: {
        rowsPerPage: 0
      }
    }
  },

  computed: {
    ...mapState('goal', ['goals', 'columns', 'fieldsForDisplay', 'searchTerm', 'stateFlag']),
    ...mapGetters('goal', ['goalsFiltered', 'optionalVisibilityColumns', 'allDisplayColumns']),
    ...mapGetters('auth', ['isAdmin'])
  },

  mounted () {
    this.$store.dispatch('goal/initGoal')
  }
}
</script>

<template>
  <section>

    <div v-show="stateFlag === 'list'">
      <div class="row bg-grey-3">
        <Search v-show="goals.length > 0"
          class="col"
          :content="searchTerm"
          @input="content => $store.commit('goal/SET_SEARCH_TERM', content)"
        />

        <div class="row q-ma-xs q-gutter-x-sm">
          <q-btn v-show="isAdmin"
            icon="add"
            color="blue-5"
            size="sm"
            round
            @click="$store.dispatch('goal/newGoal')"
          />
          <BtnDiagram/>
        </div>
      </div>

      <!-- <FieldsForDisplay v-show="selectFieldsToDisplay"/> -->
      <!-- hide-bottom -->
      <q-table v-show="goalsFiltered.length"
        class="bg-grey-2"
        dense
        flat
        square
        separator="cell"
        :pagination.sync="pagination"
        :data="goalsFiltered.sort((a, b) => a.name > b.name ? 1 : -1)"
        :columns="columns"
        :visible-columns="allDisplayColumns"
        selection="single"
        @selection="e => $store.dispatch('goal/selectGoal', e.rows[0])"
        >

        <!-- :display-value="$q.lang.table.columns" -->
        <!-- style="min-width: 150px" -->
        <!-- <template v-slot:top="props">
          <q-select
            multiple
            borderless
            dense
            options-dense
            emit-value
            map-options
            option-value="name"
            v-model="fieldsForDisplay_"
            :options="optionalVisibilityColumns"
            @input="$store.commit('goal/SET_FIELDS_FOR_DISPLAY', fieldsForDisplay_)"
          />
        </template> -->

        <!-- <template v-slot:body="props">
          <q-tr :props="props">

            <q-td v-for="(prop, idx) in props" :key="idx">
              {{ prop.label }}
            </q-td>

          </q-tr>
        </template> -->
      </q-table>
    </div>

  </section>
</template>

<style scoped lang="stylus">
</style>
