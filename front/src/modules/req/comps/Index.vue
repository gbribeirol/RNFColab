<script>
import { mapState, mapGetters } from 'vuex'

import FdSelectProject from 'src/modules/project/comps/FdSelectProject'
// import BtnNew from './BtnNew'
import List from './List'

export default {
  name: 'Req',

  components: {
    FdSelectProject,
    // BtnNew,
    List
  },

  computed: {
    ...mapState('project', ['selected']),
    ...mapGetters('auth', ['isAdmin'])
  },

  mounted () {
    this.$store.commit('SET_CURRENT_FEATURE', 'Requisitos', { root: true })
    this.$store.dispatch('position/initPosition')
    this.$store.dispatch('req/initReq')

    this.$store.commit('position/SET_ACCESSED_FROM', 'requirement')
  }
}
</script>

<template>
  <section>

    <div class="q-ma-xs">
      <div class="row bg-grey-3">
        <FdSelectProject class="col"/>

        <q-btn v-show="isAdmin && selected.id"
          icon="add"
          class="col-auto q-mt-xs q-mx-sm"
          color="blue-5"
          size="sm"
          round
          @click="$store.dispatch('req/newReq')"
        />
      </div>

      <List/>
    </div>

  </section>
</template>

<style scoped>
</style>
