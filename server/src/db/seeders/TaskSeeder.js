import { Quest, Task } from "../../models/index.js"

class TaskSeeder {
  static async seed() {
    const quest1 = await Quest.query().findOne({ name: "Choreventure" })
    const quest2 = await Quest.query().findOne({ name: "Journey to Joy" })
    const quest3 = await Quest.query().findOne({ name: "Clean the house" })
    const quest4 = await Quest.query().findOne({ name: "Finish work project" })
    const quest5 = await Quest.query().findOne({ name: "Learn to cook a new dish" })

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
      {
        name: "Clean the kitchen",
        difficulty: 4,
        questId: quest3.id,
        userId: quest3.userId,
        completed: true,
        updatedAt: new Date('February 26, 2023'),
      },
      {
        name: "Vacuum the living room",
        difficulty: 2,
        questId: quest3.id,
        userId: quest3.userId,
        completed: true,
        updatedAt: new Date('February 24, 2023'),
      },
      {
        name: "Dust the shelves",
        difficulty: 3,
        questId: quest3.id,
        userId: quest3.userId
      },
      {
        name: "Wash the windows",
        difficulty: 3,
        questId: quest3.id,
        userId: quest3.userId,
        completed: true,
        updatedAt: new Date('February 23, 2023'),
      },
      {
        name: "Take out the trash",
        difficulty: 1,
        questId: quest3.id,
        userId: quest3.userId,
        completed: true,
        updatedAt: new Date('February 21, 2023'),
      },
      {
        name: "Research",
        difficulty: 2,
        questId: quest4.id,
        userId: quest4.userId,
        completed: true,
        updatedAt: new Date('February 21, 2023'),
      },
      {
        name: "Write the outline",
        difficulty: 3,
        questId: quest4.id,
        userId: quest4.userId,
        completed: true,
        updatedAt: new Date('February 25, 2023'),
      },
      {
        name: "First draft",
        difficulty: 4,
        questId: quest4.id,
        userId: quest4.userId,
        completed: true,
        updatedAt: new Date('February 26, 2023'),
      },
      {
        name: "Second draft",
        difficulty: 3,
        questId: quest4.id,
        userId: quest4.userId
      },
      {
        name: "Final review",
        difficulty: 4,
        questId: quest4.id,
        userId: quest4.userId
      },
      {
        name: "Choose a recipe",
        difficulty: 1,
        questId: quest5.id,
        userId: quest5.userId,
        completed: true,
        updatedAt: new Date('February 19, 2023'),
      },
      {
        name: "Shop for ingredients",
        difficulty: 2,
        questId: quest5.id,
        userId: quest5.userId,
        completed: true,
        updatedAt: new Date('February 19, 2023'),
      },
      {
        name: "Watch a tutorial",
        difficulty: 3,
        questId: quest5.id,
        userId: quest5.userId
      },
      {
        name: "First attempt",
        difficulty: 4,
        questId: quest5.id,
        userId: quest5.userId
      },
      {
        name: "Second attempt",
        difficulty: 2,
        questId: quest5.id,
        userId: quest5.userId
      },
    ]

    for (const task of taskData) {
      await Task.query().insert(task)
    }
  }
}

export default TaskSeeder