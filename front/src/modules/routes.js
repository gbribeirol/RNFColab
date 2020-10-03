import { routes as auth } from './auth'
import { routes as goal } from './goal'
import { routes as project } from './project'
import { routes as req } from './req'
import { routes as position } from './position'
import { routes as report } from './report'
// import { routes as profile } from './profile'
// import { routes as mailbox } from './mailbox'
import { routes as user } from './user'
import { routes as home } from './home'
import { routes as configuration } from './configuration'

// import { routes as ranking } from './ranking'
// import { routes as map } from './map'
// import { routes as  } from './mural'
import { routes as mural } from './mural'

// import { routes as conquest } from './conquest'
// import { routes as mission } from './mission'
// import { routes as missionExecution } from './missionExecution'

export default [
  ...auth,
  ...goal,
  ...project,
  ...req,
  ...position,
  ...report,
  // ...profile,
  // ...mailbox,
  ...user,
  ...home,
  ...configuration,
  // ...ranking,
  // ...map,
  // ...mural,
  ...mural
  // ...conquest,
  // ...mission,
  // ...missionExecution
]
