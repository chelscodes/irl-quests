class Points {
  static getTaskPoints(difficulty) {
    return difficulty * 5
  }

  static getRewardPoints(motivationLevel) {
    if (motivationLevel < 3) {
      return (motivationLevel +1) * 5
    } else if (motivationLevel === 3) {
      return 30
    }
  }

  static getQuestCurrentPoints(tasks, rewards) {
    let runningTotal = 0
    tasks.forEach((task) => {
      if (task.completed) {
        const points = this.getTaskPoints(task.difficulty)
        runningTotal += points
      }
    })
    rewards.forEach((reward) => {
      if (reward.used) {
        const points = this.getRewardPoints(reward.motivationLevel)
        runningTotal -= points
      }
    })
    return runningTotal
  }
}

export default Points