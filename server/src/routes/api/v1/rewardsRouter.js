import express from "express"
import objection from "objection"
const { ValidationError } = objection
import { Reward } from "../../../models/index.js"
import RewardSerializer from "../../../serializers/RewardSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const rewardsRouter = new express.Router()

rewardsRouter.post("/", async (req, res) => {
  const cleanedRewardInput = cleanUserInput(req.body.newRewardInput)

  const { name, motivationLevel } = cleanedRewardInput
  const questId = req.body.questId
  const userId = req.user.id
  try {
    const persistedReward = await Reward.query().insertAndFetch({
      name, motivationLevel, questId, userId
    })
    const serializedReward = RewardSerializer.getSummary(persistedReward)
    return res.status(201).json({ newReward: serializedReward })
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(error)
      return res.status(422).json({ errors: error.data })
    }
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

rewardsRouter.patch("/:id", async (req, res) => {
  const rewardId = req.params.id
  const updatedUsedStatus = req.body.updatedUsedStatus
  try {
    const updatedReward = await Reward.query().patchAndFetchById(rewardId, {
      used: updatedUsedStatus
    })
    const serializedReward = RewardSerializer.getSummary(updatedReward)
    return res.status(200).json({ updatedReward: serializedReward })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

rewardsRouter.delete("/:id", async (req, res) => {
  const rewardId = req.params.id
  try {
    const rowsDeleted = await Reward.query().deleteById(rewardId)
    if (rowsDeleted === 1) {
      return res.status(200).json("Reward was successfully deleted!")
    }
    return res.status(404).json({ errors: "Reward not found" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default rewardsRouter