import { date } from 'quasar'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/messaging'
// import { firestorePlugin } from 'vuefire'

firebase.initializeApp({
  apiKey: 'AIzaSyALe1hSRBUjjOytghMeNGI8i5fY_-6IbxM',
  authDomain: 'snc-rnf.firebaseapp.com',
  databaseURL: 'https://snc-rnf.firebaseio.com',
  projectId: 'snc-rnf',
  storageBucket: 'snc-rnf.appspot.com',
  messagingSenderId: '770565908660',
  appId: '1:770565908660:web:5d13ff0bd0ab45cdac8fe1'
})

// { app(.vue entrada), router, store, Vue }
// { app, router, store, Vue, ssrContext }
export default ({ Vue }) => {
  // Vue.use(firestorePlugin)
  Vue.prototype.$firebase = firebase
  Vue.prototype.$auth = firebase.auth()
  Vue.prototype.$firestore = firebase.firestore()
  Vue.prototype.$storage = firebase.storage()
  Vue.prototype.$messaging = firebase.messaging()

  Vue.prototype.$serverDate = () => date.formatDate(firebase.firestore.Timestamp.now().toDate(), 'YYYY-MM-DD HH:mm:ss')
  Vue.prototype.$serverDate2 = () => firebase.firestore.FieldValue.serverTimestamp()

  // firebase.auth().onAuthStateChanged(user => {
  //   // Any logic you might want run when the user state changes
  //  })

  //  router.beforeEach((to, from, next) => {
  //    let currentUser = firebase.auth().currentUser
  //    let requiresAuth = to.matched.some(record => record.goal.requiresAuth)
  //    console.log('to', to, 'from', from)
  //    if (requiresAuth && !currentUser && to.path !== '/login') {
  //      console.log('Needs to be logged in .. redirecting to login')
  //      next('login')
  //    }
  //    next()
  //  })
}
