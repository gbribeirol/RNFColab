<script>
import { mapState, mapGetters } from 'vuex'
// import Recorder from 'recorder-js'
import Post from 'src/modules/mural/models/Post'
import FdSelectProject from 'src/modules/project/comps/FdSelectProject'
import NewPost from './NewPost'
// import Upload from 'src/modules/upload/comps/Index'
import ListPosts from './ListPosts'

export default {
  name: 'Index',

  components: {
    FdSelectProject,
    NewPost,
    // Upload,
    ListPosts
  },

  data: () => ({
    // recorder: null,
    audioContext: null,
    isRecording: false,
    blob: null
  }),

  computed: {
    ...mapState('project', ['selected']),
    ...mapState('mural', ['posts']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
    start () {
      // this.audioContext = new (window.AudioContext || window.webkitAudioContext)()

      // this.recorder = new Recorder(this.audioContext, {
      //   // An array of 255 Numbers
      //   // You can use this to visualize the audio stream
      //   // If you use react, check out react-wave-stream
      //   onAnalysed: data => console.log(data)
      // })

      // navigator.mediaDevices.getUserMedia({ audio: true })
      //   .then(stream => this.recorder.init(stream))
      //   .catch(err => console.log('getUserMedia', err))
    },
    startRecording () {
      // this.start()
      // this.recorder.start()
      //   .then(() => {
      //     this.isRecording = true
      //   })
    },
    stopRecording () {
      // this.recorder.stop()
      //   .then(({ blob, buffer }) => {
      //     this.blob = blob
      //     // buffer is an AudioBuffer
      //   })
    }
  },

  mounted () {
    this.$store.commit('SET_CURRENT_FEATURE', 'Mural', { root: true })
    const post = new Post({ id: '' })
    this.$store.commit('mural/SET_CUR_POST', { ...post })
  }
}
</script>

<template>
  <div class="q-pa-xs">
    <!-- <q-btn
      label="start"
      @click="startRecording"
    />
    <q-btn
      label="stop"
      @click="stopRecording"
    /> -->

    <FdSelectProject/>

    <div v-show="selected.id">
      <NewPost/>

      <ListPosts
        class="q-mt-xs"
        v-show="posts.length"
      />

      <!-- <Upload
        supportedFileTypes="video, image"
        mainPath="mural/posts"
        :folder="post.id"
        multiple
      /> -->
    </div>

  </div>
</template>

<style scoped>
  .backgroundapp {
    /* background-image: url('../../../statics/backgrounds/bg-app.jpg'); */
    background-size: cover;
  }
</style>
