/* eslint-disable prefer-const */
/* eslint-disable prefer-const */
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Erase',

  props: ['comment', 'index'],

  data () {
    return {
      content: ''
    }
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
    mUpdateComment () {
      const idx = this.index
      const cont = this.content
      this.$store.commit('mural/UPDATE_COMMENT', { idx, cont })
      this.$store.dispatch('mural/justUpdate')
    }
  },

  mounted () {
    this.content = this.comment.content
  }
}
</script>

<template>
  <div>
    <q-btn-dropdown split cover v-show="comment.owner.id === user.id" flat size="md">
      <q-list>
        <q-item>
          <q-input class="q-mt-sm bg-white" outlined
            label="Comentário"
            standout="bg-green"
            dense
            v-model="content"/>
        </q-item>
        <q-item>
            <q-btn v-close-popup @click="mUpdateComment" flat icon="save"></q-btn>
            <q-btn v-close-popup @click="$store.dispatch('mural/eraseComment', index)" flat icon="delete"></q-btn>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <!-- <q-btn v-show="post.owner.id === user.id"
      icon="edit"
      no-caps
      flat
      size="md"
      @click="$store.dispatch('mural/erasePost', post.id)"
    /> -->

  </div>
</template>
