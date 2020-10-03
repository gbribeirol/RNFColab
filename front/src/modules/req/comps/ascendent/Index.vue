<script>
import { mapState } from 'vuex'

import Header from './Header'
import List from './List'
import Fields from './Fields'

export default {
  name: 'Ascendent',

  components: {
    Header,
    List,
    Fields
  },

  computed: {
    ...mapState('req', ['reqStateFlag', 'ascStateFlag'])
  }
}
</script>

<template>
  <div>

    <q-card flat class="bg-grey-2" v-show="'update'.includes(reqStateFlag)">

      <Header/>

      <List v-if="'list'.includes(ascStateFlag)"/>

      <Fields v-else class="q-pa-xs"/>

    </q-card>

  </div>
</template>

<style scoped>
</style>
