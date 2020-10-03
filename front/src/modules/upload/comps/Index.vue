<script>
// import { mapState, mapGetters } from 'vuex'
// import FileTypeSelection from './FileTypeSelection'

export default {
  name: 'Upload',

  props: ['supportedFileTypes', 'mainPath', 'folder', 'multiple'],

  components: {
    // FileTypeSelection
  },

  data () {
    return {
      showProgress: false,
      percentProgress: 0,
      selectedFiles: [],
      uploadedFile: []
    }
  },

  computed: {
    acceptedFromSelectedTypes () { return this.$store.getters['upload/acceptedFromSelectedTypes'] },
    showAddButton () {
      return true
    }

    // ...mapGetters('upload', ['fullPathStorage'])
  },

  methods: {
    // ...mapActions('upload', ['uploadFile']),

    // selectFile (file) {
    //   console.log('selectFile - file', file)
    //   this.selectedFiles.push({
    //     file: file[0],
    //     ref: this.$storage.ref(this.$store.getters['upload/fullPathStorage'] + '/' + file[0].name),
    //     type: this.selectedFileType
    //   })
    // },

    added (files) {
      files.forEach(file => {
        this.selectedFiles.push({
          file: file,
          ref: this.$storage.ref(this.$store.getters['upload/fullPathStorage'] + '/' + file.name),
          type: file.type
        })
      })
    },

    removed (file) {
      const index = this.selectedFiles.findIndex(el => el.name === file.name)
      if (index !== -1) {
        this.selectedFiles.splice(index, 1)
        this.showProgress = false
      }
    },

    async uploadAll () {
      this.showProgress = true
      this.uploadedFile = []
      await this.selectedFiles.forEach(file => {
        this.uploadFile(file).then(url => {
          this.uploadedFile.push({
            name: file.file.name,
            fullPath: file.ref.fullPath,
            url,
            type: file.type
            // type: {
            //   label: file.type.label,
            //   ico: file.type.icon,
            //   value: file.type.value
            // }
          })

          if (this.uploadedFile.length === this.selectedFiles.length) {
            this.showProgress = false
            this.selectedFiles = []
            this.$refs.myUploader.reset()
            this.$emit('uploaded', this.uploadedFile)
            // this.$refs.clear.click()
          }
        })
      })
    },

    async uploadFile (file) {
      return new Promise((resolve, reject) => {
        file.ref.put(file.file)
          .then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
              resolve(url)
            })
          })
      })

      // let self = this
      // return new Promise((resolve, reject) => {
      //   let task = obj.ref.put(obj.file)
      //   task.on('state_changed',
      //     function progress (snapshot) {
      //       self.percentProgress = (snapshot.bytesTransferred / snapshot.totalBytes)
      //     },
      //     function error (err) {
      //       console.log(err)
      //       reject(err)
      //     },
      //     function complete () {
      //       console.log('uploadFile - complete')
      //       this.showProgress = false
      //       resolve(obj.file)
      //       // self.fileName = file.name
      //       // Notify.create({ message: 'Upload completo!', position: 'top-right', type: 'positive',
      //       //   timeout: 1000, actions: [{ icon: 'close', color: 'white', label: 'Fechar' }]
      //       // })
      //     }
      //   )
      // })
    }

    // q-uploader events
  },

  mounted () {
    this.$store.dispatch('upload/setSupportedFileTypes', this.supportedFileTypes)
    this.$store.commit('upload/SET_MAIN_PATH', this.mainPath)
    this.$store.commit('upload/SET_FOLDER', this.folder)
    this.$store.commit('upload/SET_MULTIPLE', this.multiple)
  },

  watch: {
    supportedFileTypes () {
      this.$store.dispatch('upload/setSupportedFileTypes', this.supportedFileTypes)
    },
    mainPath () {
      this.$store.commit('upload/SET_MAIN_PATH', this.mainPath)
    },
    folder () {
      this.$store.commit('upload/SET_FOLDER', this.folder)
    },
    multiple () {
      this.$store.commit('upload/SET_MULTIPLE', this.multiple)
    }
  }

  // mounted () {
  //   this.$ref.myUploader
  //     .addEventListener('click',function() {
  //       var name = document.querySelector('#input');
  //       app.names.push(name.value)
  //       name.value = ''
  //     }
  // }
}
</script>

<template>
<div>
    <div class="q-px-sm">
      Seleção de conteúdo
      <q-btn icon="close" flat round dense v-close-popup />
    </div>

    <!-- auto-expand -->
    <!-- :factory="selectFile" -->
    <q-uploader ref="myUploader"
      label="Upload"
      style="width: 100%; height: 100%;"
      flat
      text-color="black"
      color="white"
      :multiple="multiple"
      :accept="acceptedFromSelectedTypes"
      @added="added"
      @removed="removed">

      <!-- <template v-slot:header="scope"> -->
      <template v-slot:header>
        <div class="row">
          <!-- <FileTypeSelection class="q-mt-xs q-ml-xs"/> -->

          <!-- <q-btn icon="add_box" ref="btnAdded" round dense flat>
            <q-uploader-add-trigger @click="scope.pickFiles"/>
          </q-btn> -->

          <!-- v-show="selectedFiles.length > 0 && !showProgress" -->
          <q-btn v-if="selectedFiles.length === 0"
            label="Selecionar"
            icon="add_box"
            type="a"
            ref="add"
            flat
            no-caps
          >
            <q-uploader-add-trigger />
          </q-btn>

          <q-btn v-else
            label="Enviar"
            type="a"
            ref="upload"
            flat
            no-caps
            icon="cloud_upload"
            @click="uploadAll"
          />
          <!-- <q-btn v-else
            type="a"
            ref="upload"
            round dense flat
            @click="uploadAll">

            <q-icon name="cloud_upload" style="font-size: 32px;"/>
          </q-btn> -->

        </div>

        <div class="row q-mt-none q-pa-sm" v-if="showProgress">
          <q-linear-progress
            style="height: 10px"
            stripe rounded
            indeterminate
          />
        </div>

      </template>

      <!-- <template v-slot:list="scope">
        <q-list separator>

          <div class="row" v-for="file in scope.files" :key="file.name">
            <q-img v-if="file.type && file.type.substring(0, 5) === 'image'"
              class="q-mb-md"
              :src="file.img.src" style="width: 100%; height: 100%">

              <q-btn icon="clear" flat dense round @click="scope.removeFile(file)"/>
            </q-img>

            <div class="text-center">
              <q-btn icon="clear" flat dense round @click="scope.removeFile(file)"/>
              {{ file.name }}
            </div>

          </div>

        </q-list>
      </template> -->

    </q-uploader>
</div>
</template>
<!-- :value="percentProgress" -->
<!-- firebase-storage="" -->
<!-- :url="myUrl" -->
<!-- :factory="factoryFn" -->

<style scoped lang="stylus">
</style>
