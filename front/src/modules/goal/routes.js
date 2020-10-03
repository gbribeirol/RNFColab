import Index from './comps'
import Edition from './comps/Edition'
// import Edition from './comps/Edition'

export default [
  { path: '/goal', name: 'goal', component: Index },
  { path: '/goal/new', name: 'goalNew', component: Edition },
  { path: '/goal/edit', name: 'goalEdit', component: Edition }
  // { path: '/meta/comps/edition', name: 'metaEdition', component: Edition }
]
