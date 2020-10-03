<script>
import { mapState } from 'vuex'
import Toolbar from './Toolbar'
import Drawer from './Drawer'
import Footer from './Footer'

export default {
  name: 'Layout',

  components: {
    Toolbar, Drawer, Footer
  },

  computed: {
    ...mapState(['app']),
    ...mapState('auth', ['user'])
    // ...mapState('set', ['background'])
  },

  created () {
  }

}
</script>

<template>
  <q-layout view="hHh lpr lFf">

    <q-header>
      <Toolbar/>
    </q-header>

    <Drawer/>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer>
      <Footer/>
    </q-footer>

  </q-layout>
</template>

<style scoped>
  /* .q-page-container { */
    /* background-image: none !important; */
    /* background-color:none; */
    /* background-image: url('../../../assets/city/TrevisoBG.jpg'); */
    /* background-repeat: no-repeat; */
    /* background-size: cover; */
    /* background-position: center center; */
    /* background-attachment: fixed; */
  /* } */
</style>
