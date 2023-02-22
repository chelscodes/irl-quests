import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";
import QuestSerializer from "../../../serializers/QuestSerializer.js";
import UserStats from "../../../services/UserStats.js";

const usersRouter = new express.Router()

usersRouter.get("/user-summary", async (req, res) => {
  const userId = req.user.id
  try {
    const user = await User.query().findById(userId)
    const quests = await user.$relatedQuery("quests")
    const serializedQuests = quests.map((quest) => {
      const serializedQuest = QuestSerializer.getName(quest)
      return serializedQuest
    })
    const stats = await UserStats.getTimeRangeStatsForTasks(user)
    const userSummary = { quests: serializedQuests, stats: stats }
    return res.status(200).json({ userSummary })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

usersRouter.post("/", async (req, res) => {
  const { email, username, password, passwordConfirmation } = req.body
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, username })
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser })
    })
  } catch (error) {
    console.log(error)
    return res.status(422).json({ errors: error })
  }
})

export default usersRouter;
