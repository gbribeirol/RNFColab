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
    ...mapState('project', ['copy']),
    ...mapGetters('project', ['contentChanged'])
  },

  methods: {

  }

}
</script>

<template>
  <section>

    <Fields class="q-pa-xs"/>

    <Btns class="text-center q-ma-sm"/>

  </section>
</template>

<style scoped lang="scss">
</style>
