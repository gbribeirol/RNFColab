/* eslint-disable handle-callback-err */
import { register } from 'register-service-worker'
import Vue from 'vue'
const vue = new Vue()

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

// register(process.env.SERVICE_WORKER_FILE, {
register('statics/firebase-messaging-sw.js', {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready () {
    // console.log('[register-service-worker] App is being served from cache by a service worker.')
  },

  registered (registration) {
    // console.log('[register-service-worker] Service worker has been registered.')
    vue.$messaging.useServiceWorker(registration)
  },

  cached (registration) {
    // console.log('[register-service-worker] Content has been cached for offline use.')
  },

  updatefound (registration) {
    // console.log('[register-service-worker] New content is downloading.')
  },

  updated (registration) {
    // console.log('[register-service-worker] New content is available; please refresh.')
  },

  offline () {
    // console.log('[register-service-worker] No internet connection found. App is running in offline mode.')
  },

  error (err) {
    // console.error('[register-service-worker] Error during service worker registration:', err)
  }
})
