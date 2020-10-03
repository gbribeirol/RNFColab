<script>

export default {
  name: 'Index',

  props: ['selected'],

  data () {
    return {
      selected_: null,

      mediaTypes: [
        {
          label: 'Doc.',
          value: 'doc',
          icon: 'assignment',
          acceptType: '.pdf, .doc, .docx, .txt',
          maxFileSizeByte: 10000 * 1024
        }, {
          label: 'Img',
          value: 'image',
          icon: 'image',
          acceptType: 'image/*',
          maxFileSizeByte: 10000 * 1024
        }, {
          label: 'Vídeo',
          value: 'video',
          icon: 'videocam',
          acceptType: 'video/*',
          maxFileSizeByte: 50000 * 1024
        }, {
          label: 'Audio',
          value: 'audio',
          icon: 'audiotrack',
          acceptType: 'audio/*',
          maxFileSizeByte: 10000 * 1024
        }
      ]
    }
  },

  watch: {
    selected () {
      this.selected_ = this.selected
    }
  }
}
</script>

<template>
  <q-card flat class="q-pa-sm q-py-xs text-body2 text-grey-7 bg-grey-4">
    <div>
      Tipo de mídia
    </div>

    <q-btn-toggle
      no-caps
      unelevated
      rounded
      size="sm"

      color="grey-4"
      toggle-color="green"

      text-color="grey-7"
      toggle-text-color="white"

      :options="mediaTypes"
      v-model="selected_"
      @input="$emit('select', selected_)"
    />

  </q-card>
</template>

<style scoped lang="stylus">
</style>
