import { uid } from 'quasar'
import Store from 'src/store'
import Vue from 'vue'
const vue = new Vue()

export default class Req {
  constructor (param = { id: uid() }) {
    const { state } = Store()
    this.id = param.id || uid()

    this.name = param.name || ''
    this.sentence = param.sentence || 'O Sistema deve <verbo> <objeto> para <complemento> [<quando> / <se>] condição.'
    this.construction = param.construction || null
    this.type = param.type || ''
    this.state = param.state || 'Criado'

    this.creationDate = param.creationDate || vue.$firebase.firestore.Timestamp.now()
    this.engineerCreator = param.engineerCreator || { ...state.auth.basicUser }

    this.goals = param.goals || []
    this.ascendents = param.ascendents || []
    this.descendents = param.descendents || []
    this.finalPosition = param.finalPosition || ''
    this.originOfPosition = param.originOfPosition || ''
  }
}
