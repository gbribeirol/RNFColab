export default {
  fileTypes: [
    {
      label: 'Documento',
      value: 'doc',
      icon: 'assignment',
      acceptType: ['.pdf', '.doc', '.docx', '.txt'],
      maxFileSizeByte: 10000 * 1024
    }, {
      label: 'Imagem',
      value: 'image',
      icon: 'image',
      acceptType: ['image/*'],
      maxFileSizeByte: 10000 * 1024
    }, {
      label: 'Vídeo',
      value: 'video',
      icon: 'videocam',
      acceptType: ['video/*'],
      maxFileSizeByte: 150000 * 1024
    }, {
      label: 'Audio',
      value: 'audio',
      icon: 'audiotrack',
      acceptType: ['audio/*'],
      maxFileSizeByte: 10000 * 1024
    }
  ],

  supportedFileTypes: '',
  mainPath: '',
  folder: '',
  multiple: '',

  selectedFileType: []
}
