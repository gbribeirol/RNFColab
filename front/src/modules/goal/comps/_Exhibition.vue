<script>
import { mapState, mapGetters } from 'vuex'
import Btns from './btn/Btns'

export default {
  name: 'Exhibition',

  components: {
    Btns
  },

  computed: {
    ...mapState('goal', ['copy']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
    mDelete (itemId) {
      this.$store.dispatch('goal/select', itemId)
      this.$store.dispatch('goal/erase')
    },

    mSelect () {
      var link = document.createElement('a')
      link.href = this.copy.file.url
      // link.download = this.copy.file.name
      document.body.appendChild(link)
      link.target = '_blank'
      link.click()
    }
  }
}
</script>

<template>
  <q-card class="q-pa-xs">

    <q-card flat class="q-ma-xs">

      <q-card-section>
        <div class="text-h6">Nome: {{ copy.name }}</div>
        <div class="text-subtitle2">Tema: {{ copy.theme }}</div>
      </q-card-section>

      <q-card-section class="text-black">Palavras-Chave: {{ copy.keywords }}</q-card-section>

      <q-btn v-show="isAdmin"
        flat
        icon="delete"
        @click="mDelete(copy.id)"
      />

    </q-card>

    <Btns class="text-center q-ma-sm"/>

  </q-card>
</template>

<style scoped lang="stylus">
</style>
