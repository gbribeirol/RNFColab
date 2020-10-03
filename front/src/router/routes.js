import { routes as moduleRoutes } from '../modules'
import LoginForm from 'src/modules/auth/comps/LoginForm.vue'
import NewUserAccountForm from 'src/modules/user/comps/NewUserAccountForm'
import RecoverEmailPassword from 'src/modules/auth/comps/RecoverEmailPassword'
import LocalNotification from 'src/comps/LocalNotification'
import OutdatedApp from 'src/pages/OutdatedApp'

// import oiSendMail from 'src/comps/email/Send'

const coreRoutes = [
  // { path: 'dashboard', name: 'dashboard', component: () => import('pages/dashboard') },
  // { path: 'report', name: 'report', component: () => import('pages/report') }
]

const routes = [
  { path: '/auth/loginForm', name: 'authLoginForm', component: LoginForm },
  { path: '/user/newUserAccountForm', name: 'user.newUserAccountForm', component: NewUserAccountForm },
  { path: '/auth/recoverEmailPassword', name: 'authRecoverEmailPassword', component: RecoverEmailPassword },
  { path: '/pages/outdatedApp', name: 'outdatedApp', component: OutdatedApp },
  {
    path: '/',
    component: () => import('src/modules/layout/comps/Layout.vue'),
    children: [
      ...coreRoutes,
      ...moduleRoutes
      // { path: 'home', component: () => import('pages') },
      // { path: 'post', name: 'post', component: () => import('pages/post') },
      // { path: 'dashboard', name: 'dashboard', component: () => import('pages/dashboard') },
      // { path: 'report', name: 'report', component: () => import('pages/report') }
    ]
  },
  { path: '/localNotification', name: 'localNotification', component: LocalNotification }

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
