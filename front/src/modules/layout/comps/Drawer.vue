<script>
import { mapState } from 'vuex'
import cpMenu from 'src/modules/menu/comps/Index'

export default {
  name: 'Drawer',

  components: {
    cpMenu
  },

  computed: {
    ...mapState('layout', ['displayDrawer'])
  }

  // data () {
  //   return {
  //     drawerLocal: false,
  //     drawer: true
  //   }
  // },

  // watch: {
  //   drawerLocal () {
  //     this.$store.commit('layout/SET_DISPLAY_DRAWER', !this.drawerLocal)
  //   },
  //   drawerOpen () {
  //     this.drawerLocal = this.displayDrawer
  //   }
  // },

  // mounted () {
  //   this.drawerLocal = this.displayDrawer
  // }
}
</script>

<template>
  <!-- <div> -->

    <q-drawer
      side="left"
      v-model="displayDrawer"
      :content-class="$q.theme === 'mat' ? 'bg-indigo-2 text-indigo' : null"
    >

      <q-list no-border link inset-delimiter class="q-pa-none">
        <cpMenu/>
      </q-list>

    </q-drawer>

  <!-- </div> -->
</template>
