export default function getTotalNumberOfFirmsAndBlocks (reqs) {
  let totalNumberOfFirmsAndBlocks = 0
  reqs.forEach(req => {
    totalNumberOfFirmsAndBlocks += (req.whoIsFirmsOrBlocks ? 1 : 0) +
      req.ascendents.filter(asc => asc.correlationAssociation && !asc.deleted && asc.whoIsFirmsOrBlocks).length
  })
  return totalNumberOfFirmsAndBlocks
}
