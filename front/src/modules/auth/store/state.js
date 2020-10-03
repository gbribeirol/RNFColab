import User from 'src/modules/user/models/User'

export default {
  featureName: 'Autenticação',

  userCredential: new User({
    email: '',
    password: ''
    // email: 'admin@gmail.com',
    // password: '123456'
  }),

  authInProgress: false,

  user: null,
  basicUser: null
}
