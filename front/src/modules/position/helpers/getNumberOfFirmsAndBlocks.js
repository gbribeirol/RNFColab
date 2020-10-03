export default function getNumberOfFirmsAndBlocks (reqs, participantId) {
  let numberOfFirmsAndBlocks = 0
  reqs.forEach(req => {
    numberOfFirmsAndBlocks += (req.whoIsFirmsOrBlocks && req.whoIsFirmsOrBlocks.id === participantId ? 1 : 0) +
      req.ascendents.filter(asc => asc.correlationAssociation && !asc.deleted && asc.whoIsFirmsOrBlocks && asc.whoIsFirmsOrBlocks.id === participantId).length
  })
  return numberOfFirmsAndBlocks
}
