export default {
  goals: [],
  loading: false,

  selected: {},
  copy: {},

  stateFlag: 'list',

  searchTerm: '',

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
      align: 'left'
      // style: 'max-width: 250px'
    }, {
      name: 'ascendants', field: 'ascendants', label: 'ASCENDENTES',
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left'
    }, {
      name: 'descendants', field: 'descendants', label: 'DESCENDENTES',
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left'
    }
  ],

  fieldsForDisplay: ['name', 'description'],

  /*
    correlations
  */
  correlated: null,
  correlation: null,

  /*
    ascending correlations
  */
  ascCorrelationStateFlag: 'list',
  ascCorrelationSelected: [],

  /*
    descending correlations
  */
  desCorrelationStateFlag: 'list',
  desCorrelationSelected: []
}
