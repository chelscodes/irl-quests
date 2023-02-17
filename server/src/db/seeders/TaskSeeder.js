import { Quest, Task } from "../../models/index.js"

class TaskSeeder {
  static async seed() {
    const quest1 = await Quest.query().findOne({ name: "Choreventure" })
    const quest2 = await Quest.query().findOne({ name: "Journey to Joy" })
    const quest3 = await Quest.query().findOne({ name: "Mundane Mayhem" })

    const taskData = [
      {
        name: "Clean the dishes",
        difficulty: 3,
        questId: quest1.id,
        userId: quest1.userId
      },
      {
        name: "Make the bed",
        difficulty: 1,
        questId: quest1.id,
        userId: quest1.userId
      },
      {
        name: "Clear off the dining table",
        difficulty: 2,
        questId: quest1.id,
        userId: quest1.userId
      },
      {
        name: "Clean the bathroom",
        difficulty: 4,
        questId: quest1.id,
        userId: quest1.userId
      },
      {
        name: "Journal for 10 minutes",
        difficulty: 2,
        questId: quest2.id,
        userId: quest2.userId
      },
      {
        name: "Go for a walk outside",
        difficulty: 3,
        questId: quest2.id,
        userId: quest2.userId
      },
      {
        name: "Call a friend",
        difficulty: 4,
        questId: quest2.id,
        userId: quest2.userId
      },
    ]

    for (const task of taskData) {
      await Task.query().insert(task)
    }
  }
}

export default TaskSeeder