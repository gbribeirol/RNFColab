<script>
import { mapState } from 'vuex'
import MyBtn from 'src/comps/Btn'

export default {
  name: 'Add',

  components: {
    MyBtn
  },

  data: () => ({
    visibleColumns: []
  }),

  methods: {
    new_ () {
      // alert('novo')
    }
  }
}
</script>

<template>
  <q-table-columns
    label=":"
    v-model="visibleColumns"
    :columns="users.columns"/>
</template>
