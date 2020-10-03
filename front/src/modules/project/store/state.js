export default {
  projects: [],
  loading: false,

  selected: {},
  copy: {},
  flag: 'list',
  searchTerm: '',

  daysToNotifyProjectEnd: 1,

  columns: [
    {
      name: 'id', field: 'id', label: 'ID',
      search: true,
      visible: false,
      required: false,
      sortable: true,
      align: 'left',
      style: ''
    }, {
      name: 'name', field: 'name', label: 'NOME',
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left',
      style: 'max-width: 250px'
    }, {
      name: 'description', field: 'description', label: 'DESCRIÇÃO',
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left',
      style: 'max-width: 250px'
    }
  ],

  fieldsForDisplay: ['name', 'description'],

  states: [
    { id: '1', name: 'Iniciada' },
    { id: '2', name: 'Cancelada' },
    { id: '3', name: 'Finalizada' }
  ],

  /*
    participants
  */

  participantFlag: 'list',
  participantSelected: [],
  participant: null,
  roler: '',

  /*
  mural
  */

  muralLoading: false,
  muralList: [],
  muralAllPostList: [],
  muralSelected: {},
  muralPost: {},
  muralComment: ''
}
