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

    <q-icon v-show="isAdmin || comment.owner.id === user.id"
      name="delete"
      @click="$store.dispatch('mural/eraseComment', index)"
    />

  </span>
</template>
