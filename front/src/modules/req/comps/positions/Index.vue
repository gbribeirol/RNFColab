<script>
import Header from './Header'
import List from './List'
import Fields from 'src/modules/position/comps/Fields'

export default {
  name: 'Goals',

  components: {
    Header,
    List,
    Fields
  },

  computed: {
    reqStateFlag () {
      return this.$store.state.req.stateFlag
    },
    posStateFlag () {
      return this.$store.state.position.positionFlag
    }
  },

  data () {
    return {
      // lSelected: [],

      columns: [
        {
          name: 'label', field: 'label', label: 'Nome',
          search: true,
          visible: false,
          required: false,
          sortable: true,
          align: 'left',
          style: ''
        }
      ]
    }
  }

  // methods: {
  //   loadLSelected () { this.lSelected = this.goalSelected }
  // },

  // mounted () {
  //   this.loadLSelected()
  // },

  // watch: {
  //   goalSelected () { this.loadLSelected() }
  // }
}
</script>

<template>
  <div>

    <q-card flat class="bg-grey-2">

      <Header/>

      <List v-if="'list'.includes(posStateFlag)"/>

      <Fields v-else class="q-pa-xs"/>

    </q-card>

  </div>
</template>

<style scoped>
</style>
