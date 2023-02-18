import TaskSerializer from "./TaskSerializer.js"
import RewardSerializer from "./RewardSerializer.js"

class QuestSerializer {
  static async getSummary(quest) {
    const allowedAttributes = ["id", "name", "description", "userId"]

    let serializedQuest = {}
    for (const attribute of allowedAttributes) {
      serializedQuest[attribute] = quest[attribute]
    }

    const tasksData = await quest.$relatedQuery("tasks")
    const tasks = await Promise.all(tasksData.map( async (task) => {
      const serializedTask = TaskSerializer.getSummary(task)
      return serializedTask
    }))
    serializedQuest.tasks = tasks

    const rewardsData = await quest.$relatedQuery("rewards")
    const rewards = await Promise.all(rewardsData.map( async (reward) => {
      const serializedReward = RewardSerializer.getSummary(reward)
      return serializedReward
    }))
    serializedQuest.rewards = rewards

    return serializedQuest
  }
}

export default QuestSerializer