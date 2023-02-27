import { Quest, User } from "../../models/index.js"

class QuestSeeder {
  static async seed() {
    const user1 = await User.query().findOne({ email: "chels@email.com" })
    const user2 = await User.query().findOne({ email: "irl@quests.com" })

    const questsData = [
      {
        name: "Choreventure",
        description: "The Choreventure awaits! Embark on a thrilling journey through the perils of household tasks and emerge victorious as the champion of order and cleanliness.",
        userId: user1.id, 
      }, 
      {
        name: "Journey to Joy",
        description: "The land of happiness and joy awaits. Begin your journey to joy and unlock the hidden treasures of inner contentment.",
        userId: user1.id,
      }, 
      {
        name: "Clean the house",
        description: "Battle dirt and dust as you work towards earning the ultimate prize - a movie night!",
        userId: user2.id,
      },
      {
        name: "Finish work project",
        description: "Take on the challenge of conquering the work to-do list, with a night out with friends as the reward!",
        userId: user2.id,
      },
      {
        name: "Learn to cook a new dish",
        description: "Embark on a culinary adventure, complete with tutorials and trial-and-error, to earn the chance to try a new restaurant!",
        userId: user2.id,
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