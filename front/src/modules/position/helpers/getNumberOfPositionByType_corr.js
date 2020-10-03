/* eslint-disable camelcase */
export default function getNumberOfPositionByType_corr (positions) {
  return [
    { name: 'Fortalece', value: positions.filter(e => e.position.label === 'Fortalece').length },
    { name: 'Enfraquece', value: positions.filter(e => e.position.label === 'Enfraquece').length },
    { name: 'Afeta', value: positions.filter(e => e.position.label === 'Afeta').length },
    { name: 'Não afeta', value: positions.filter(e => e.position.label === 'Não afeta').length },
    { name: 'Abster-se', value: positions.filter(e => e.position.label === 'Abster-se').length }
  ]
}
