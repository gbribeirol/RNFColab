import Vue from 'vue'
const vue = new Vue()

export default function (user, messageContent) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'KEY=AAAAQd6TgYo:APA91bEBMy9yVtlG9bJeSg41l6RJfaulospz4ofvXdWuRG6T7mkAAycqvkLF_ISTfuAwCmR1ZMjHOWd8GIJqCa0DqNvew-sblkLMyqF7BOXt4IJ4pFj3yA2GJ_tZbk7lceVlaUbdNKvY'
  }

  let data = {
    'to': user.messageToken,
    'notification': {
      'title': 'Push de ' + user.name,
      'body': 'messageContent',
      'click_action': 'http://goggle.com.br',
      'icon': 'https://www.flaticon.com/free-icon/phone-call_126509'
    }
  }
  vue.$axios.post('https://fcm.googleapis.com/fcm/send', data, headers)

  // if (!('serviceWorker' in navigator)) {
  //   console.log('Navegador incompatível com serviceWorker')
  //   return
  // }

  // vue.$messaging.requestPermission().then(() => {
  //   getToken()
  // })

  // navigator.serviceWorker.register('./static/firebase-messaging-sw.js').then(registration => {
  //   vue.$messaging.useServiceWorker(registration)

  //   vue.$messaging.requestPermission().then(() => {
  //     getToken()
  //   })
  // }).catch(err => console.warn('Erro ao registrar o service worker firebase-messaging-sw', err))

  // vue.$messaging.onTokenRefresh(() => {
  //   vue.$messaging.getToken().then(token => {
  //     console.log('onTokenRefresh', token)
  //   })
  // })
}

// function getToken () {
//   vue.$messaging.getToken().then(currentToken => {
//     if (currentToken) {
//       console.log('Enviar isso para um servidor:', currentToken)
//       return currentToken
//     }
//     console.warn('CurrentToken indisponível')
//   })
// }
