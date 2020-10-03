<script>
import { mapState } from 'vuex'

import Header from './Header'
import List from './List'
import Fields from './Fields'

export default {
  name: 'Goals',

  components: {
    Header,
    List,
    Fields
  },

  computed: {
    ...mapState('req', ['goalStateFlag'])
  }
}
</script>

<template>
  <div>

    <!-- v-show="'update'.includes(reqStateFlag)" -->
    <q-card flat class="bg-grey-2">

      <Header/>

      <List v-if="'list'.includes(goalStateFlag)"/>

      <Fields v-else class="q-pa-xs"/>

    </q-card>

  </div>
</template>

<style scoped>
</style>
