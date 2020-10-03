const field1 = { label: 'DATA', value: 'creationDate' }
const field2 = { label: 'PARTICIPANTE', value: '[owner][name]' }
const field3 = { label: 'TIPO', value: 'messageType' }

export default {
  featureName: 'mural',

  posts: [],

  postSearchTerm: '',
  postSortField: field1,
  postOrderFields: [field1, field2, field3],
  curPost: null,
  data: null
}
