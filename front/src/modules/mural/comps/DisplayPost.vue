<script>
import { mapState } from 'vuex'
import { date } from 'quasar'

// import Avatar from '../Avatar'
import LikeButton from './buttons/Like'
import CommentButton from './buttons/Comment'
import commentList from './comment/List'
// import MediaList from './MediaList'
// import Menu from './Menu'
// import EraseButton from './buttons/Erase'

export default {
  name: 'DisplayPost',

  props: ['post'],

  components: {
    // Avatar,
    LikeButton,
    CommentButton,
    commentList
    // MediaList,
    // Menu,
    // EraseButton
  },

  data () {
    return {
      date,
      comment: '',
      showComments: false
    }
  },

  computed: {
    ...mapState('user', ['list']),

    user () {
      const posterId = this.post.owner.id
      const index = this.list.findIndex(el => el.id === posterId)
      return this.list[index]
    }
  },

  methods: {
    getUrl (param) {
      const x = window.atob(param)
      const xx = window.URL.createObjectURL(x)
      return xx
    },

    mAddComment () {
      this.$store.dispatch('mural/addComment', this.comment)
      this.comment = ''
    }
  }
}
</script>

<template>
  <section class="text-blue-grey-4">

    <div class="row">
      <!-- <Avatar :url="post.owner.avatarUrl"/> -->

      <!-- <EraseButton class="col-1" :post="post"/> -->

      <!-- <q-btn v-show="$store.getters.auth.isAdmin || post.owner.id === $store.state.auth.user.id" -->
      <q-btn v-show="post.owner.id === $store.state.auth.user.id"
        icon="delete"
        no-caps
        flat
        size="md"
        @click="$store.dispatch('mural/erasePost', post.id)"
      />

      <div class="col-11 q-pl-sm q-pt-sm">
        {{ date.formatDate(post.creationDate.toDate(), 'DD/MM HH:mm') }}
        {{ post.owner.name }}
        {{ post.messageType }}
      </div>

      <!-- <Menu :post="post"/> -->
      <div class="q-mx-sm text-blue-grey text-subtitle2 text-weight-bold" v-html="post.message"/>
    </div>

    <!-- <div class="q-mx-sm"> -->
      <!-- <MediaList :files="post.files"/> -->

      <div class="row justify-around q-mb-sm">
        <LikeButton :post="post"/>
        <CommentButton :post="post" @click.native="showComments = !showComments"/>
      </div>

      <!-- <div v-for="(el, index) in post.files.filter(e => e.type === 'audio')" :key="index" class="recorded-item"> -->
        <!-- -{{ el.data }}- -->
        <!-- -{{ atob(el.data) }}- -->
        <!-- <div><audio :src="getUrl(el.data)" controls /></div> -->
        <!-- <div><button @click="removeRecord(index)" class="button is-dark">delete</button></div> -->
      <!-- </div> -->
    <!-- </div> -->

    <div class="q-px-md" v-show="showComments">
      <div class="row">
        <commentList :post="post"/>
      </div>

      <div class="row">
        <q-input class="col-11 q-px-md"
          label="Adicione um comentário..."
          v-show="showComments"
          dense
          borderless
          v-model="comment"
          @keyup.enter="mAddComment"
        />

        <q-btn
          icon="send"
          class="col"
          flat
          rounded=""
          size="sm"
          @click="mAddComment"
        />
      </div>
    </div>

  </section>
</template>

<style scoped lang="stylus">
</style>
