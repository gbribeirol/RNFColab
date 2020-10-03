/* eslint-disable space-before-function-paren */

export default function getLastPositionsOfAType(positions, type) {
  const positionsOfAType = positions.filter(pos => pos.type === type)

  return positionsOfAType
    .sort((a, b) => a.creationDate > b.creationDate ? -1 : 1)
    .filter((e, i, a) => {
      if (e.req.name === 'Adaptável a sistemas operacionais.') {
        console.log('positions', positions)
        console.log('positionsOfAType ------------->', positionsOfAType)
      }

      if (type === 'Requisito') {
        return a.findIndex(pos => pos.req.value === e.req.value && pos.participant.id === e.participant.id) === i
      } else {
        return a.findIndex(pos =>
          e.associatedCorrelation &&
          pos.associatedCorrelation.value === e.associatedCorrelation.value &&
          pos.participant.id === e.participant.id
        ) === i
      }
    })
}
