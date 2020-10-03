<script>
import List from './List'
import Diagram from './diagram'

export default {
  name: 'Index',

  components: {
    List,
    Diagram
  },

  mounted () {
    this.$store.dispatch('goal/initGoal')
  }
}
</script>

<template>
  <div class="q-ma-xs bg-grey-3">

    <List/>
    <Diagram/>

  </div>
</template>

<style scoped lang="stylus">
</style>
