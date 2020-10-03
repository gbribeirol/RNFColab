export default function getFirstPositioningOfAParticipant (positions, participantId) {
  return positions
    .sort((a, b) => a.creationDate < b.creationDate ? -1 : 1)
    .filter(position => position.participant.id === participantId)[0]
}
