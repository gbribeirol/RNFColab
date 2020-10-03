/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

// navigator.serviceWorker.register('./sw.js')
//   .then(r => {
//     console.log('r', r)
//   })
//   .catch(err => {
//     console.log(err)
//   })

// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js')
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js')

// self.addEventListener('install', function (event) {
//   console.log('------- install ---------')
// })

this.oninstall = function (e) {
  // console.log('------- oninstall -------')
}

// self.addEventListener('fetch', function (event) {
//   console.log('------- fetch -----------')
//   event.respondWith(
//     caches.match(event.request)
//       .then(function (response) {
//         // Cache hit - return response
//         if (response) {
//           return response
//         }
//         return fetch(event.request)
//       }
//       )
//   )
// })
this.onfetch = function (e) {
  // console.log('------- onfetch ---------')
  // console.log(e)
}

// eslint-disable-next-line no-undef
firebase.initializeApp({ messagingSenderId: '770565908660' })

// eslint-disable-next-line no-undef
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('---- setBackgroundMessageHandler ----')
  return self.registration.showNotification({}, {})
})
