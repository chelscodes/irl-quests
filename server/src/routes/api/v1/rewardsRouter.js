import express from "express"
import { Reward } from "../../../models/index.js"
import RewardSerializer from "../../../serializers/RewardSerializer.js"

const rewardsRouter = new express.Router()

rewardsRouter.patch("/:rewardId", async (req, res) => {
  const rewardId = req.params.rewardId
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

export default rewardsRouter