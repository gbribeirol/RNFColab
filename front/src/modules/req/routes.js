import Index from './comps'
import Edition from './comps/Edition'

export default [
  { path: '/req', name: 'req', component: Index },
  { path: '/req/new', name: 'reqNew', component: Edition },
  { path: '/req/edit', name: 'req.Edit', component: Edition }
]
