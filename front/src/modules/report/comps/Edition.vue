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
    ...mapState('report', ['copy']),
    ...mapGetters('report', ['contentChanged'])
  },

  methods: {

  }

}
</script>

<template>
  <div>

    <Fields class="q-pa-sm"/>

    <Btns class="text-center q-ma-sm"/>

  </div>
</template>

<style scoped lang="scss">
</style>
