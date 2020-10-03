<script>
import { mapState } from 'vuex'
// import ProgressLevel from 'src/modules/user/comps/ProgressLevel'
// import { openURL } from 'quasar'

// import electron from 'electron'
// console.log(electron)
// const display = electron.screen.getAllDisplays()
// console.log(display)

export default {
  name: 'Toolbar',

  components: {
    // ProgressLevel
  },

  computed: {
    ...mapState(['app']),
    ...mapState('auth', ['user'])
  },

  data () {
    return {
    }
  },

  methods: {
    exit: () => {
      // console.log(history)
      // console.log(-(history.length - 2))
      // history.go(0)
      // this.$router.back()
      // console.log('exit')
      // navigator.app.exitApp()
      // window.close()
      // window.app.exitApp()

      // window.app.exitApp()
      // history.go(-(history.length - 2))
    }

  }
}
</script>

<template>
  <!-- q-toolbar -->
  <q-toolbar class="row">

    <div class="col-auto">
      <q-btn v-show="app.currentFeatureName !== 'Autenticação'"
        class="q-ma-none q-pa-none"
        flat
        round
        icon="menu"
        size="md"
        @click="$store.commit('layout/SWITCH_DRAWER')"
      />

      <q-img
        class="q-mr-sm"
        src="statics/icons/logo.png"
        style="width: 50px"
      />
    </div>

    <div class="col-auto justify-left">
      <div class="text-left">
        <div style="font-size: 18px">
          {{ $store.state.app.name }}
        </div>

        <div style="font-size: 13px">
          {{ $store.state.app.currentFeature }}
        </div>
      </div>
    </div>

    <div class="col text-right q-mr-md">
      <div style="font-size: 13px">
        {{ $store.state.auth.user.name }}
      </div>

      <div class="q-mt-sm" style="font-size: 10px">
        Versão atual: {{ $store.state.app.version }}

        <span v-if="$store.state.app.firestore[0] && $store.state.app.version !== $store.state.app.firestore[0].version">
          Nova: {{ $store.state.app.firestore[0].version }}
        </span>
      </div>
    </div>

    <!-- <q-toolbar-title>
        <div class="q-title" v-text="app.currentFeatureName"/>
    </q-toolbar-title> -->

    <!-- PASSAR O ITEM HOME PARA DENTRO O MENU -->
    <!-- <q-btn class="q-pa-xs" v-show="user && app.currentFeatureName !== 'Home'"
      flat style="font-size: 20px"
      @click="$router.push({ name: 'home' })">

      <q-icon name="home"/>

    </q-btn> -->

    <!-- FULL SCREEN -->
    <!-- <q-btn flat style="font-size: 20px" @click="$q.fullscreen.toggle()" class="q-pa-xs">
      <q-icon :name="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"/>
    </q-btn> -->

    <!-- EXIT -->
    <!-- <q-btn
      flat style="font-size: 20px"
      @click="exit"
      class="q-pa-xs">

      <q-icon name="exit_to_app"/>

    </q-btn> -->

  </q-toolbar>
</template>

<style scoped lang="stylus">
  .t-progress {
    width: 50%;
  }
  .q-linear-progress {
    border-radius: 4px;
  }
  .q-linear-progress-track {
    background-color: #9D9E9C;
    opacity: .5;
  }
  .ip-score {
    flex-wrap : nowrap;
    & > .number {
        font-weight: bold;
        font-size: 20px;
        color: $color-number-score;
    }
    & > .img {
      height: 30px;
      width: auto;
    }
  }
  .ip-msg{
    position relative;
    & > .img{
      height: 25px;
      width: auto;
      }
  }
  .alert-msg{
    display block;
    width: 13px;
    height: 13px;
    background: $color-alert-msg;
    border-radius: 50%;
    top: -.5em;
  }
</style>
