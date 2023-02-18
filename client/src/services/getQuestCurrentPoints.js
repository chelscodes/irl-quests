import getRewardPoints from "./getRewardPoints"
import getTaskPoints from "./getTaskPoints"

const getQuestCurrentPoints = (tasks, rewards) => {
  let runningTotal = 0
  tasks.forEach((task) => {
    if (task.completed) {
      const points = getTaskPoints(task.difficulty)
      runningTotal += points
    }
  })
  rewards.forEach((reward) => {
    if (reward.used) {
      const points = getRewardPoints(reward.motivationLevel)
      runningTotal -= points
    }
  })
  return runningTotal
}

export default getQuestCurrentPoints