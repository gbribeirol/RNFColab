export default {
  app: {
    name: 'RNF Colab',
    version: '1.1.5',
    email: 'RNF Colab <rnfcolab@gmail.com>',
    currentFeature: '',
    currentRoute: '',
    previousRoute: '',
    avatar: [],
    suffix: '@trevisoplay.com.br',
    firestore: null,

    correlationTypes: [
      { label: 'Fortalece', value: 1 },
      { label: 'Enfraquece', value: 2 },
      { label: 'Afeta', value: 3 },
      { label: 'Não afeta', value: 4 }
    ],

    refinementsTypes: [
      { label: 'E', value: 1 },
      { label: 'Ou', value: 2 }
    ]
  }
}
