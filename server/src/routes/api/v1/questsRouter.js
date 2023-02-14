import express from "express"
import { Quest } from "../../../models/index.js"

const questsRouter = new express.Router()

questsRouter.get("/:id", async (req, res) => {
  try {
    const questId = req.params.id
    const quest = await Quest.query().findById(questId)
    return res.status(200).json({ quest })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default questsRouter