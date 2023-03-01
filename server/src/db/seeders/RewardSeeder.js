import { Quest, Reward } from "../../models/index.js"

class RewardSeeder {
  static async seed() {
    const quest1 = await Quest.query().findOne({ name: "Choreventure" })
    const quest2 = await Quest.query().findOne({ name: "Journey to Joy" })
    const quest3 = await Quest.query().findOne({ name: "Clean the house" })
    const quest4 = await Quest.query().findOne({ name: "Finish work project" })
    const quest5 = await Quest.query().findOne({ name: "Learn to cook a new dish" })

    const rewardData = [
      {
        name: "Watch a movie",
        motivationLevel: 3,
        questId: quest1.id,
        userId: quest1.userId
      },
      {
        name: "15 min break",
        motivationLevel: 2,
        questId: quest1.id,
        userId: quest1.userId
      },
      {
        name: "A piece of candied ginger",
        motivationLevel: 2,
        questId: quest1.id,
        userId: quest1.userId
      },
      {
        name: "Buy a new book",
        motivationLevel: 3,
        questId: quest2.id,
        userId: quest2.userId
      },
      {
        name: "A piece of candy",
        motivationLevel: 1,
        questId: quest2.id,
        userId: quest2.userId
      },
      {
        name: "Watch a movie",
        motivationLevel: 3,
        questId: quest3.id,
        userId: quest3.userId
      },
      {
        name: "Take a 10-minute break",
        motivationLevel: 2,
        questId: quest3.id,
        userId: quest3.userId,
        used: true
      },
      {
        name: "Have a small snack",
        motivationLevel: 1,
        questId: quest3.id,
        userId: quest3.userId,
        used: true
      },
      {
        name: "Spend 15 minutes browsing online",
        motivationLevel: 2,
        questId: quest3.id,
        userId: quest3.userId
      },
      {
        name: "Have a night out with friends at your favorite restaurant",
        motivationLevel: 3,
        questId: quest4.id,
        userId: quest4.userId
      },
      {
        name: "Take a quick walk outside or around the block",
        motivationLevel: 2,
        questId: quest4.id,
        userId: quest4.userId
      },
      {
        name: "Have a cup of tea or coffee",
        motivationLevel: 1,
        questId: quest4.id,
        userId: quest4.userId
      },
      {
        name: "Have a small snack",
        motivationLevel: 1,
        questId: quest4.id,
        userId: quest4.userId
      },
      {
        name: "Try a new restaurant or dish of your choice.",
        motivationLevel: 3,
        questId: quest5.id,
        userId: quest5.userId
      },
      {
        name: "Take a 5-minute break to stretch and move",
        motivationLevel: 1,
        questId: quest5.id,
        userId: quest5.userId
      }
    ]

    for (const reward of rewardData) {
      await Reward.query().insert(reward)
    }
  }
}

export default RewardSeeder