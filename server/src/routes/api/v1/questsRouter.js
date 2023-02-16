import express from "express"
import objection from "objection"
const { ValidationError } = objection
import { Quest } from "../../../models/index.js"
import QuestSerializer from "../../../serializers/QuestSerializer.js"
import questsTasksRouter from "./questsTasksRouter.js"

const questsRouter = new express.Router()

questsRouter.post("/", async (req, res) => {
  const { name, description } = req.body
  const userId = req.user.id
  try {
    const persistedQuest = await Quest.query().insertAndFetch({ name, description, userId })
    return res.status(201).json({ quest: persistedQuest })
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(error)
      return res.status(422).json({ errors: error.data })
    }
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})


questsRouter.get("/:id", async (req, res) => {
  const questId = req.params.id
  try {
    const quest = await Quest.query().findById(questId)
    const serializedQuest = await QuestSerializer.getSummary(quest)
    return res.status(200).json({ quest: serializedQuest })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

questsRouter.use("/:id/tasks", questsTasksRouter)

export default questsRouter