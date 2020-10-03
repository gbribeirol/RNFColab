<script>
import { mapState } from 'vuex'
export default {
  name: 'Menu',

  props: ['post'],

  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>

<template>
  <div>

    <q-btn icon="expand_more" flat class="q-pa-none" v-show="post.owner.id === user.id">

      <q-menu
        transition-show="flip-right"
        transition-hide="flip-left">

        <q-list style="min-width: 100px">
          <q-item clickable>
            <!-- <q-item-section @click="$store.dispatch('mural/setCurPost', post.id); messageModal = true">Editar</q-item-section> -->
            <q-item-section @click="$store.commit('mural/SET_CUR_POST', post); messageModal = true">Editar</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section @click="$store.dispatch('mural/erase', post.id)">Apagar</q-item-section>
          </q-item>
        </q-list>

      </q-menu>

    </q-btn>

  </div>
</template>

<style scoped lang="stylus">
</style>
