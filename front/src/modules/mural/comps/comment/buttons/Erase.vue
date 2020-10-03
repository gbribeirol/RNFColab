<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Erase',

  props: ['comment', 'index'],

  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isAdmin'])
  }
}
</script>

<template>
  <span>

    <q-btn v-show="isAdmin || comment.owner.id === user.id"
      icon="delete"
      rounded
      size="sm"
      flat
      @click="$store.dispatch('mural/eraseComment', index)"
    />

  </span>
</template>
