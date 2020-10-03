import { date } from 'quasar'

export default function getNumberOfDaysFromFirstPositioning (projectStartDate, firstPositioning, numberOfProjectDays) {
  if (firstPositioning) {
    const firstPosDate = firstPositioning.creationDate
    return date.getDateDiff(firstPosDate, projectStartDate, 'days')
  } else {
    return numberOfProjectDays
  }
}
