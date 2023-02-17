const getQuestCurrentPoints = (tasks) => {
  let runningTotal = 0
  tasks.forEach((task) => {
    if (task.completed) {
      runningTotal += task.points
    }
  })
  return runningTotal
}

export default getQuestCurrentPoints