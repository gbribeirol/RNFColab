import Vue from 'vue'
import _ from 'lodash'
// import VuePlyr from 'vue-plyr'
// import 'vue-plyr/dist/vue-plyr.css'
// Vue.use(VuePlyr)

// Registro Global Automático para Componentes de Base
// =============================================================
const requireComponent = require.context(
  // O caminho relativo da pasta de componentes
  '../comps',
  // Se deve ou não olhar subpastas
  true,
  // Expressão regular para localizar nomes de componentes base
  /[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
  // Pega a configuração do componente
  const componentConfig = requireComponent(fileName)

  // Obtém nome em PascalCase do componente
  const componentName = _.upperFirst(
    _.camelCase(
      // Obtém o nome do arquivo, independentemente da profundidade da pasta
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // Registra o componente globalmente
  Vue.component(
    componentName,
    // Olha para as opções em `.default`, existentes
    // se o componente foi exportado com `export default`,
    // caso contrário usa o módulo raiz.
    componentConfig.default || componentConfig
  )
})

// rotação de imagem
// =============================================================
import VueImgOrientationChanger from 'vue-img-orientation-changer'
Vue.use(VueImgOrientationChanger)

// zoom
// =============================================================
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)

// audio recorder
// import VueRecord from '@codekraft-studio/vue-record'
// Vue.use(VueRecord)

// import VueQrcodeReader from 'vue-qrcode-reader'
// Vue.use(VueQrcodeReader)

// // import panzoom from 'panzoom'
// // Vue.use(panzoom)

// import 'vue-zoomer/dist/vue-zoomer.css'
// import VueZoomer from 'vue-zoomer/src/index.js'
// Vue.use(VueZoomer)

/* eslint-disable */
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (de, para) {
    var str = this.toString()
    var pos = str.indexOf(de)
    while (pos > -1) {

      str = str.replace(de, para)
      pos = str.indexOf(de)
    }
    return (str)
  }
}

// Array.prototype.groupBy = function(prop) {
//   return this.reduce(function(groups, item) {
//     const val = item[prop]
//     groups[val] = groups[val] || []
//     groups[val].push(item)
//     return groups
//   }, {})
// }

// Vue.prototype.$d3 = require('d3')

Vue.prototype.$randomString = function (len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

if (!String.prototype.random) {
  String.prototype.random = function (len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }
}

if (!String.prototype.rtrim) {
  String.prototype.rtrim = function (str) {
    if(!str) return str;
    return str.replace(/\s+$/g, '');
    }
}

if (!Number.prototype.pad) {
  Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }
}

