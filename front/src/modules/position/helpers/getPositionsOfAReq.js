export default function getPositionsOfAReq (positions, reqId) {
  return positions.filter(pos =>
    pos.req.value === reqId &&
    pos.changed === false
  ).sort((a, b) => a.creationDate < b.creationDate ? -1 : 1)
}
