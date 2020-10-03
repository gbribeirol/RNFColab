/* eslint-disable camelcase */
export default function getNumberOfPositionByType_reqs (positions) {
  return [
    { name: 'Descartável', value: positions.filter(e => e.position.label === 'Descartável').length },
    { name: 'Desejável', value: positions.filter(e => e.position.label === 'Desejável').length },
    { name: 'Essencial', value: positions.filter(e => e.position.label === 'Essencial').length },
    { name: 'Abster-se', value: positions.filter(e => e.position.label === 'Abster-se').length }
  ]
}
