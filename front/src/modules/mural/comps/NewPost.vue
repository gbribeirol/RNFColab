<script>
import { mapState, mapActions } from 'vuex'

// import ConquestLoop from 'src/modules/conquest/comps/ConquestLoop'
import Post from '../models/Post'

export default {
  name: 'NewPost',

  props: {
    hidePostButton: { type: Boolean, default: false }
  },

  computed: {
    ...mapState('mural', ['post'])

    // ...mapGetters('conquest', ['communicatorPlayer'])
  },

  data () {
    return {
      message: '',
      messageType: '',
      showConquestLoop: false,
      showMenu: false,
      mediaType: '',
      recordings: []
    }
  },

  methods: {
    ...mapActions('mural', ['saveFiles']),

    mAddMedia (mediaType) {
      this.mediaType = mediaType
      this.showMenu = true
    },

    mUploaded (files) {
      this.saveFiles(files)
      this.showMenu = false
      this.message = ''
      this.messageType = ''
    },

    mAddPost () {
      // this.$refs.sdfadsf.style.visibility = 'hidden'
      const post = new Post({ message: this.message, messageType: this.messageType })
      this.$store.dispatch('mural/addPost', { ...post }).then(r => {
        this.message = ''
        this.messageType = ''
      })
      // this.$store.commit('dashboard/SET_PUSH_MESSAGE', 'Existem novidades no mural do Mundo Treviso!')
      // this.$store.commit('dashboard/SET_PUSH_TITLE', 'Novidades do Mundo Treviso')
      // this.$store.dispatch('dashboard/sendPushNotification', 'all')
    },

    onResult (data) {
      const post = new Post({ message: this.message })
      const blob = window.btoa(data)
      // const blob = this.$firebase.firestore.Blob.fromUint8Array(new Uint8Array(data))
      post.files.push({ type: 'audio', data: blob })
      // console.log('blob', blob)
      this.$store.dispatch('mural/addPost', { ...post }).then(r => {
        this.message = ''
        this.messageType = ''
      })
    }
  },

  mounted () {
    // this.$store.commit('mural/NEW_POST')
    // this.message = this.$store.state.mural.post.message
  },

  watch: {
    // communicatorPlayer () {
    //   this.showConquestLoop = this.communicatorPlayer.won
    // }
  }
}
</script>

<template>
  <section>
    <!-- <vue-record-audio @result="onResult"/> -->

    <div class="row">
      <q-input class="col"
        label="Mensagem"
        dense
        filled
        v-model="message"
        @keyup.enter="mAddPost"
      />
      <!-- <template v-slot:append v-show="message !== null && !hidePostButton"> -->
        <!-- <span v-show="message !== null && !hidePostButton"> -->
          <!-- <q-icon
            name="add_a_photo"
            @click="mAddMedia('image')"
          /> -->
          <!-- <q-icon
            name="video_call"
            @click="mAddMedia('video')"
          /> -->
          <!-- <q-icon
            name="mic"
            @click="mAddMedia('audio')"
          /> -->
          <!-- <q-icon
            name="send"
            @click="mAddPost"
          /> -->
        <!-- </span> -->
      <!-- </template> -->

      <!-- <Selection
        label="Projeto"
        :selected="$store.state.project.selected"
        :optionValue="opt => opt"
        :optionLabel="opt => opt.name"
        :options="$store.state.project.projects"
        @input="content => $store.commit('project/SET_SELECTED', content, { root: true })"
      /> -->

      <div class="row" v-show="message">
        <!-- <Selection
          label="Tipo"
          class="q-ml-xs"
          :selected="messageType"
          :options="['', 'SUGESTÃO', 'DÚVIDA']"
          @input="content => messageType = content"
        /> -->

        <q-select
          label="Tipo"
          filled
          dense
          options-dense
          bg-color="grey-3"
          transition-show="scale"
          transition-hide="scale"
          v-model="messageType"
          behavior="menu"
          :options="['SUGESTÃO', 'DÚVIDA']"
          @keyup.enter="mAddPost"
        />

        <div class="bg-grey-3">
          <q-btn
            icon="send"
            class="q-mt-xs q-mx-sm"
            color="blue"
            size="10px"
            round
            @click="mAddPost"
          />
          </div>
      </div>
    </div>

    <q-dialog persistent v-model="showConquestLoop">
      <!-- <ConquestLoop/> -->
    </q-dialog>

    <q-dialog v-model="showMenu">
      <q-card class="text-center">

        <Upload
          multiple
          mainPath="mural/posts"
          :supportedFileTypes="mediaType"
          folder="post.id"
          @close="showMenu = false"
          @uploaded="mUploaded"
        />

      </q-card>
    </q-dialog>

  </section>
</template>

<style scoped lang="stylus">

</style>
