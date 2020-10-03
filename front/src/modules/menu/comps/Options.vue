<script>
import { mapState, mapGetters } from 'vuex'
// import MyBtn from 'src/comps/Btn'
export default {
  name: 'Options',

  components: {
    // MyBtn
  },

  props: {
    group: { type: Object }
  },

  computed: {
    ...mapState('menu', ['options']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
    select (option) {
      this.$store.commit('layout/SET_DISPLAY_DRAWER', false)
      this.$router.push({ name: `${option.route}` })
    },

    executeCmd (cmd) {
      // this.$router.push('/auth')
      cmd(this)
      // this.$auth.onAuthStateChanged(user => {
      //   if (!user) {
      //     this.$store.dispatch('auth/setUserByKey', '')
      //     this.$router.push({ name: 'auth' })
      //   } else {
      //     this.$store.dispatch('auth/setUserByKey', user.uid)
      //   }
      // })
    }
  }
}
</script>

<template>
    <div class="row">

      <q-item v-for="(option, idx) in options"
        :key="idx"
        class="q-pt-md q-px-xs col-12 itens-menu text-blue">

        <div v-if="option.route" @click="select(option)" class="item-menu">
          <img :src="option.src" class="ico-menu"/>
          <span class="q-px-sm">{{ option.label }} </span>
        </div>

        <div v-else
          @click="executeCmd(option.cmd)" class="item-menu">
          <img :src="option.src" class="ico-menu"/>
          <span class="q-px-sm">{{ option.label }}</span>
        </div>
        <q-icon name="keyboard_arrow_right" class="float-right" size="sm" color="blue-5"/>

      </q-item>

    </div>

</template>

<style lang="stylus">
.ico-menu{
  width: auto;
  // height: 65%;
}
.itens-menu{
  border-bottom: 1px solid rgba(203, 188, 150, 0.5);;
  border-left: 3px solid rgba(0,0,0,0);
  &:hover{
    border-left: 3px solid #627890;
  }
}
.item-menu{
  font-size: 15px;
  text-transform: uppercase;
  width: 100%;
  &:hover{
    cursor: pointer;
  }
}
</style>
