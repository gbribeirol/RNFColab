import Index from './comps'
import Edition from './comps/Edition'
// import Edition from './comps/Edition'

export default [
  { path: '/project', name: 'project', component: Index },
  { path: '/project/new', name: 'projectNew', component: Edition },
  { path: '/project/edit', name: 'projectEdit', component: Edition }
  // { path: '/meta/comps/edition', name: 'metaEdition', component: Edition }
]
