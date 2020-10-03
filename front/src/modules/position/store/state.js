import store from '../../../store'
// import store from 'src/store'
// { ...store().state.auth.basicUser }
// const $store = new Store()
console.log('store', store)

export default {
  positions: [],

  curPosition: {},
  curPositionCp: {},

  positionFlag: 'list',

  positionSearchTerm: '',

  accessedFrom: '',

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
    //   name: 'construction.label',
    //   field: row => row.construction.label,
    //   label: 'PROJETO',
    //   search: true,
    //   visible: true,
    //   required: true,
    //   sortable: true,
    //   align: 'left',
    //   style: 'max-width: 250px'
    // }, {
      label: 'REQUISITO',
      name: 'req.label',
      field: row => row.req.label,
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left',
      style: 'max-width: 250px'
    }, {
      label: 'DATA',
      name: 'creationDateF',
      field: row => row.creationDateF,
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left'
    }, {
      label: 'TIPO',
      name: 'type',
      field: 'type',
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left',
      style: 'max-width: 250px'
    }, {
      label: 'CORRELAÇÃO',
      name: 'associatedCorrelation.label',
      field: row => row.associatedCorrelation ? row.associatedCorrelation.label : '',
      search: false,
      visible: true,
      required: true,
      sortable: true,
      align: 'left',
      style: ''
    }, {
      label: 'POSICIONADOR',
      name: 'participant.name',
      field: row => row.participant.name,
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left'
    }, {
      label: 'POSIÇÃO',
      name: 'position.label',
      field: row => row.position.label,
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left',
      style: 'max-width: 250px'
    }, {
      label: 'ARGUMENTO',
      name: 'argument',
      field: row => row.argument,
      search: true,
      visible: true,
      required: true,
      sortable: true,
      align: 'left'
    }
  ],

  fieldsForDisplay: ['name', 'sentence'],

  types: ['Requisito', 'Correlação'],

  positionTypes: [
    { label: 'Descartável', value: 1 },
    { label: 'Desejável', value: 2 },
    { label: 'Essencial', value: 3 },
    { label: 'Abster-se', value: 4 }
  ],

  /*
    classifications
  */
  classificationFlag: 'list',
  curClassification: null,
  classificationTypes: [
    { label: 'Relevante', value: 1, weight: 5 },
    { label: 'Informativo', value: 2, weight: 3 },
    { label: 'Inconsistente', value: 3, weight: 0 }
  ]
}
