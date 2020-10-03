<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Btns',

  computed: {
    ...mapState('goal', ['stateFlag']),
    ...mapGetters('goal', ['contentChanged']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
    lAdd () {
      this.$store.dispatch('goal/addGoal')
        .then(res => {
          // if (Object.keys(this.copy.file).length !== 0) {
          //   this.$router.push({ name: 'goal' })
          // }
        })
    },

    lUpdate () {
      this.$store.dispatch('goal/updateGoal')
      // .then(res => {
      //   if (Object.keys(this.copy.file).length !== 0) {
      //     this.$router.push({ name: 'goal' })
      //   }
      // })
    },

    lErase () {
      this.$store.dispatch('goal/eraseGoal')
      // .then(res => {
      //   this.$store.commit('goal/SET_STATE_FLAG', 'list')
      // })
    }
  }
}
</script>

<template>
  <section>

    <div class="q-gutter-x-sm">
      <q-btn v-show="stateFlag === 'added' || (stateFlag !== 'new' && !contentChanged)"
        label="Voltar"
        class="ip-btn bg-grey-4"
        flat
        size="sm"
        v-close-popup
        @click="$router.push({ name: 'goal' })"
      />

      <q-btn v-show="stateFlag === 'new' || contentChanged"
        label="Cancelar"
        class="ip-btn bg-grey-4"
        flat
        size="sm"
        v-close-popup
        @click="$router.push({ name: 'goal' })"
      />

      <q-btn v-show="stateFlag === 'new'"
        label="Adicionar"
        class="ip-btn bg-grey-4"
        flat
        size="sm"
        @click="lAdd"
      />

      <q-btn v-show="stateFlag === 'update' && contentChanged"
        label="Salvar"
        class="ip-btn bg-grey-4"
        flat
        size="sm"
        @click="lUpdate"
      />

      <q-btn v-show="isAdmin && stateFlag === 'update'"
        label="Apagar"
        class="ip-btn bg-grey-4"
        flat
        size="sm"
        v-close-popup
        @click="lErase"
      />
    </div>

  </section>
</template>

<style scoped lang="stylus">
</style>
