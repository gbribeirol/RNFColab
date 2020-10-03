<script>
import { mapState, mapGetters } from 'vuex'
import Fields from './Fields'
import Btns from './Btns'

export default {
  name: 'Edition',

  components: {
    Fields,
    Btns
  },

  data () {
    return {
      showModal: false,
      content: ''
    }
  },

  computed: {
    ...mapState('req', ['copy']),
    ...mapGetters('req', ['contentChanged'])
  },

  methods: {

  }

}
</script>

<template>
  <div class="q-pa-xs">

    <Fields/>

    <Btns class="text-center q-ma-sm"/>

  </div>
</template>

<style scoped lang="scss">
</style>
