import TaskSerializer from "./TaskSerializer.js"

class QuestSerializer {
  static async getSummary(quest) {
    const allowedAttributes = ["id", "name", "description", "currentPoints", "userId"]

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
    return serializedQuest
  }
}

export default QuestSerializer