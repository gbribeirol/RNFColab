import Index from './comps'
import Edition from './comps/Edition'

export default [
  { path: '/position', name: 'position', component: Index },
  { path: '/position/new', name: 'positionNew', component: Edition },
  { path: '/position/edit', name: 'positionEdit', component: Edition }
  // { path: '/meta/comps/edition', name: 'metaEdition', component: Edition }
]
