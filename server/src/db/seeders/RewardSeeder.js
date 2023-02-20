import { Quest, Reward } from "../../models/index.js"

class RewardSeeder {
  static async seed() {
    const quest1 = await Quest.query().findOne({ name: "Choreventure" })
    const quest2 = await Quest.query().findOne({ name: "Journey to Joy" })
    const quest3 = await Quest.query().findOne({ name: "Mundane Mayhem" })

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
      }
    ]

    for (const reward of rewardData) {
      await Reward.query().insert(reward)
    }
  }
}

export default RewardSeeder