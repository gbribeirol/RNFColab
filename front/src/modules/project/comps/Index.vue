<script>
import { mapState } from 'vuex'

import List from './List'
// import Edition from './Edition'

export default {
  name: 'Index',

  components: {
    List
    // Edition
  },

  data () {
    return {
      lStateFlag: this.flag
    }
  },

  computed: {
    ...mapState('project', ['flag', 'selected'])
  },

  watch: {
    flag () {
      if (this.lStateFlag !== this.flag) {
        this.lStateFlag = this.flag
      }
    },
    lStateFlag () {
      if (this.lStateFlag !== this.flag) {
        this.$store.commit('project/SET_FLAG', this.lStateFlag)
      }
    }
  },

  mounted () {
    this.$store.dispatch('project/initProject')
    this.lStateFlag = this.flag
  }
}
</script>

<template>
  <div class="q-ma-xs bg-grey-3">

    <List/>

    <!-- <Edition v-show="selected.id"/> -->

  </div>
</template>

<style scoped lang="stylus">
</style>
