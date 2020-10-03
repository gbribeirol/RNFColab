<script>
import { mapState } from 'vuex'

export default {
  name: 'FileTypeSelection',

  data () {
    return {
      selectedFileType_: null
    }
  },

  computed: {
    ...mapState('upload', ['fileTypes', 'selectedFileType']),
    uploadFileTypesFilteredOptions () { return this.$store.getters['upload/fileTypesFilteredOptions'] }
  },

  mounted () {
    this.selectedFileType_ = this.selectedFileType
  },

  watch: {
    selectedFileType () {
      this.selectedFileType_ = this.selectedFileType
    }
  }

  // watch: {
  //   uploadTask () {
  //     this.uploadTask.on('state_changed', sp => {
  //       this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
  //     },
  //     null,
  //     () => {
  //       this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
  //         this.$emit('url', downloadURL)
  //       })
  //     })
  //   }
  // },

  // methods: {
  //   ...mapActions('mural', ['saveFiles']),

  //   update (fileName) {
  //     this.$store.commit('mission/SET_FILE_NAME', fileName)
  //     this.$store.dispatch('mission/justUpdateMission')
  //   },

  //   mLoaded (files) {
  //     let filesWithType = files.map(el => Object.assign(el, { type: this.selectedFileType }))
  //     this.saveFiles(filesWithType)
  //     this.$emit('close')
  //   }

  //   // upload (file) {
  //   //   let fileRef = this.$storage.ref('/missions' + '/' + file.name)
  //   //   this.uploadTask = fileRef.put(file)
  //   // },
  // }
}
</script>

<template>
  <span class="q-ma-none q-pa-none">
    <q-btn-toggle
      unelevated
      no-caps
      size="sm"

      color="grey-4"
      toggle-color="green"

      text-color="grey-7"
      toggle-text-color="white"

      v-model="selectedFileType_"
      :options="uploadFileTypesFilteredOptions"
      @input="$store.commit('upload/SET_SELECTED_FILE_TYPE', selectedFileType_)"
    />

  </span>
</template>

<style scoped lang="stylus">
</style>
