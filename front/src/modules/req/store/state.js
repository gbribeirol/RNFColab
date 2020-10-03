export default {
  reqs: [],
  loading: false,

  selected: {},
  copy: {},

  reqStateFlag: 'list',

  reqSearchTerm: '',

  fieldsForDisplay: ['name', 'sentence'],

  types: ['Funcional', 'Não funcional', 'Inverso'],

  states: ['Criado', 'Em Negociação', 'Descartado', 'Cancelado', 'Construído'],

  columns: [
    {
    //   name: 'id', field: 'id', label: 'ID',
    //   search: true,
    //   visible: false,
    //   required: false,
    //   sortable: true,
    //   align: 'left',
    //   style: ''
    // }, {
      name: 'name', field: 'name', label: 'NOME',
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left',
      style: 'max-width: 250px'
    }, {
    //   name: 'state', field: 'state', label: 'ESTADO',
    //   search: true,
    //   visible: true,
    //   required: true,
    //   sortable: true,
    //   align: 'left',
    //   style: 'max-width: 250px'
    // }, {
    //   name: 'construction.label',
    //   field: row => row.construction.label,
    //   label: 'PROJETO',
    //   search: true,
    //   visible: true,
    //   required: true,
    //   sortable: true,
    //   align: 'left',
    //   style: 'max-width: 250px'
      name: 'type', field: 'type', label: 'TIPO',
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left',
      style: 'max-width: 250px'
    }, {
      name: 'state', field: 'state', label: 'ESTADO',
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left'
    }, {
      name: 'disposable', field: row => row.numberOfPositionsByType_reqs[0].value, label: 'DESCARTÁVEIS',
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'center',
      headerStyle: 'text-align: center'
    }, {
      name: 'desirable', field: row => row.numberOfPositionsByType_reqs[1].value, label: 'DESEJÁVEIS',
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'center',
      headerStyle: 'text-align: center'
    }, {
      name: 'essential', field: row => row.numberOfPositionsByType_reqs[2].value, label: 'ESSENCIAIS',
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'center',
      headerStyle: 'text-align: center'
    }, {
      name: 'abstain', field: row => row.numberOfPositionsByType_reqs[3].value, label: 'ABSTENÇÕES',
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'center',
      headerStyle: 'text-align: center'
    }, {
      name: 'finalPosition', field: 'finalPosition', label: 'POSIÇÃO FINAL',
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left'
    }, {
      name: 'originOfPosition', field: 'originOfPosition', label: 'FORMA DECISÃO',
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left'
    }, {
      name: 'sentence', field: 'sentence', label: 'SENTENÇA',
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left'
    // }, {
    //   name: 'numberOfGoals', field: 'numberOfGoals', label: 'CATÁLOGOS',
    //   search: true,
    //   visible: true,
    //   required: true,
    //   sortable: true,
    //   align: 'center',
    //   style: 'max-width: 50px'
    // }, {
    //   name: 'numberOfCorrelations', field: 'numberOfCorrelations', label: 'CORRELAÇÕES',
    //   search: true,
    //   visible: true,
    //   required: true,
    //   sortable: true,
    //   align: 'center',
    //   style: 'max-width: 50px'
    // }, {
    //   name: 'numberOfRefinements', field: 'numberOfRefinements', label: 'REFINAMENTOS',
    //   search: true,
    //   visible: true,
    //   required: true,
    //   sortable: true,
    //   align: 'center',
    //   style: 'max-width: 50px'
    }
  ],

  /*
    goals
  */
  currentGoal: null,
  goalStateFlag: 'list',

  /*
    ascendent
  */
  currentAsc: null,
  ascStateFlag: 'list',

  /*
   descendent
 */
  currentDes: null,
  desStateFlag: 'list'

  /*
    associate
  */
  // correlationStateFlag: 'list',
  // correlationSelected: [],
  // associated: null,
  // correlationAssociation: null,
  // refinementAssociation: null

}
