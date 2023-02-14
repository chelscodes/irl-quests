import { Quest, User } from "../../models/index.js"

class QuestSeeder {
  static async seed() {
    const user1 = await User.query().findOne({ email: "chels@email.com" })
    const user2 = await User.query().findOne({ email: "cam@email.com" })

    const questsData = [
      {
        name: "Choreventure",
        description: "The Choreventure awaits! Embark on a thrilling journey through the perils of household tasks and emerge victorious as the champion of order and cleanliness.",
        userId: user1.id, 
        currentPoints: 0
      }, 
      {
        name: "Journey to Joy",
        description: "The land of happiness and joy awaits. Begin your journey to joy and unlock the hidden treasures of inner contentment.",
        userId: user1.id,
        currentPoints: 0
      }, 
      {
        name: "Mundane Mayhem",
        description: "The mundane tasks of everyday life have been turned upside down. Take up the mantle of the Mundane Mayhem and restore order to the chaos.",
        userId: user2.id,
        currentPoints: 0
      }
    ]

    for (const quest of questsData) {
      const currentQuest = await Quest.query().findOne({ name: quest.name })
      if(!currentQuest) {
        await Quest.query().insert(quest)
      }
    }
  }
}

export default QuestSeeder