<script>
import { mapActions, mapState } from 'vuex'
import Upload from 'src/comps/Upload'

export default {
  name: 'MultiMedia',

  props: ['fileTypesAccepted'],

  components: {
    Upload
  },

  data () {
    return {

      fileTypes: [
        {
          label: 'Vídeo',
          value: 'video',
          icon: 'videocam',
          acceptType: 'video/*'
        }, {
          label: 'Documento',
          value: 'doc',
          icon: 'assignment',
          acceptType: '.pdf, .doc, .docx'
        }, {
          label: 'Audio',
          value: 'audio',
          icon: 'audiotrack',
          acceptType: 'audio/*'
        }, {
          label: 'Imagem',
          value: 'image',
          icon: 'image',
          acceptType: 'image/*'
        }
      ],
      selectedFileType: undefined,

      progressUpload: 0,
      file: {},
      uploadTask: '',
      files: []
    }
  },

  computed: {
    ...mapState('mural', ['curPost']),

    fileTypesFiltered () {
      if (!this.fileTypesAccepted) {
        return this.fileTypes
      } else {
        return this.fileTypes.filter(el => this.fileTypesAccepted.includes(el.value))
      }
    }
  },

  watch: {
    uploadTask () {
      this.uploadTask.on('state_changed', sp => {
        this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
      },
      null,
      () => {
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.$emit('url', downloadURL)
        })
      })
    }
  },

  methods: {
    ...mapActions('mural', ['saveFiles']),

    update (fileName) {
      this.$store.commit('mission/SET_FILE_NAME', fileName)
      this.$store.dispatch('mission/justUpdateMission')
    },

    mLoaded (files) {
      const filesWithType = files.map(el => Object.assign(el, { type: this.selectedFileType }))
      this.saveFiles(filesWithType)
      this.$emit('close')
    }

    // upload (file) {
    //   let fileRef = this.$storage.ref('/missions' + '/' + file.name)
    //   this.uploadTask = fileRef.put(file)
    // },
  }
}
</script>

<template>
  <div class="q-ma-sm">

    <q-card class="q-pa-md">

        <div class="row q-gutter-md">
          <div v-for="filetype in fileTypesFiltered" :key="filetype.label"
            class="col"
            clickable
            @click="selectedFileType = filetype.value">

            <q-icon :name="filetype.icon" class="text-orange" style="font-size: 3em;" /><br/>

            <q-radio
              :val="filetype"
              v-model="selectedFileType"
            />
          </div>
        </div>

        <!-- @loaded="saveFile" -->
        <!-- @erase="eraseFile" -->

        <Upload v-if="selectedFileType"
          class="q-pt-md text-center"
          path="/posts"
          :acceptFileType="selectedFileType.acceptType"
          :folder="curPost.id"
          @loaded="mLoaded"
        />

    </q-card>

  </div>
</template>

<style scoped lang="stylus">

</style>
