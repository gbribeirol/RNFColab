/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js')

firebase.initializeApp({ messagingSenderId: '770565908660' })

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function (payload) {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload)

  return self.registration.showNotification('Message title', { body: 'Message body', icon: '/statics/logo.png' })
})
