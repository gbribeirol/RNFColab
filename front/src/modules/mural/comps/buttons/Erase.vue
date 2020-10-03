<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Erase',

  props: ['post'],

  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isAdmin'])
  }
}
</script>

<template>
  <section>

    <q-btn v-show="isAdmin || post.owner.id === user.id"
      icon="delete"
      no-caps
      flat
      size="md"
      @click="$store.dispatch('mural/erasePost', post.id)"
    />

  </section>
</template>
