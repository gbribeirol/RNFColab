export default {
  featureName: 'Configuração',

  evaluationParameters: [{
    group: 'Participação',
    parameters: [
      { name: '% questões de preenchidas', weight: 0, weakOf: 0, weakUntil: 0, moderateOf: 0, moderateUntil: 0, strongOf: 0, strongUntil: 0 },
      { name: '% argumentos de preenchidos', weight: 0, weakOf: 0, weakUntil: 0, moderateOf: 0, moderateUntil: 0, strongOf: 0, strongUntil: 0 }
    ]
  }, {
    group: 'Pontualidade',
    parameters: [
      { name: '% tempo de preenchimento das questões', weight: 0, weakOf: 0, weakUntil: 0, moderateOf: 0, moderateUntil: 0, strongOf: 0, strongUntil: 0 }
    ]
  }, {
    group: 'Colaboração',
    parameters: [
      { name: '% alterações de posição para convergir', weight: 0, weakOf: 0, weakUntil: 0, moderateOf: 0, moderateUntil: 0, strongOf: 0, strongUntil: 0 },
      { name: '% questões bloclk ou firm', weight: 0, weakOf: 0, weakUntil: 0, moderateOf: 0, moderateUntil: 0, strongOf: 0, strongUntil: 0 }
    ]
  }, {
    group: 'Contribuição Argumentos',
    parameters: [
      { name: '% inconsistente, informativo e relevante', weight: 0, weakOf: 0, weakUntil: 0, moderateOf: 0, moderateUntil: 0, strongOf: 0, strongUntil: 0 },
      { name: 'Argumento inconsistente', weight: 0, weakOf: 0, weakUntil: 0, moderateOf: 0, moderateUntil: 0, strongOf: 0, strongUntil: 0 },
      { name: 'Argumento informativo', weight: 0, weakOf: 0, weakUntil: 0, moderateOf: 0, moderateUntil: 0, strongOf: 0, strongUntil: 0 },
      { name: 'Argumento relevante', weight: 0, weakOf: 0, weakUntil: 0, moderateOf: 0, moderateUntil: 0, strongOf: 0, strongUntil: 0 }
    ]
  }]
}
