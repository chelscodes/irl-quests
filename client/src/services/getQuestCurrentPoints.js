import getTaskPoints from "./getTaskPoints"

const getQuestCurrentPoints = (tasks) => {
  let runningTotal = 0
  tasks.forEach((task) => {
    if (task.completed) {
      const points = getTaskPoints(task.difficulty)
      runningTotal += points
    }
  })
  return runningTotal
}

export default getQuestCurrentPoints