<script>
import { mapState } from 'vuex'
import Options from './Options'

export default {
  name: 'home',

  components: {
    Options
  },

  computed: {
    ...mapState('menu', ['featureName'])
  },

  mounted () {
    this.$store.commit('SET_CURRENT_FEATURE', this.featureName)
  }
}
</script>

<template>

  <Options/>

</template>

<style lang="stylus">
  // @import '~variables'
</style>
