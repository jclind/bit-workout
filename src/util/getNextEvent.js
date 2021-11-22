export const getNextEvent = (
  currEvent,
  dataArr,
  setCurrEvent,
  setWorkoutFinished
) => {
  // Declare var for the next event element
  let nextEvent
  // If currEvents is null, meaning it doesn't exist, nextEvent will be set to the first workout.
  if (!currEvent) {
    nextEvent = dataArr.path[0]
  } else {
    // Get id of current event
    const currEventId = currEvent.id
    // Get next event using id of current event
    nextEvent = dataArr.path.find(ex => ex.id === currEventId + 1)
  }
  // Console log if nextEvent doesn't exist meaning there are no more elements
  if (!nextEvent) {
    setWorkoutFinished(true)
    console.log('No more exercises!')
  } else {
    // Set the current event to the next event
    setCurrEvent(nextEvent)
  }
}
