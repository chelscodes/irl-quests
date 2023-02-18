import React from "react"
import RewardTile from "./RewardTile"
import updateRewardStatus from "../services/apiClient/updateRewardStatus"

const RewardList = (props) => {
  const { rewards, setRewards } = props

  const handleToggle = async (rewardId, usedStatus) => {
    const updatedUsedStatus = !usedStatus
    await updateRewardStatus(rewardId, updatedUsedStatus)

    const updatedRewards = rewards.map((reward) => {
      if (rewardId === reward.id) {
        return {
          ...reward,
          used: !reward.used
        }
      }
      return reward
    })

    setRewards(updatedRewards)
  }

  const rewardTiles = rewards.map((reward) => {
    return (
      <RewardTile
        key={reward.id}
        reward={reward}
        handleToggle={handleToggle}
      />
    )
  })

  return (
    <>
      <h3>Rewards</h3>
      {rewardTiles}
    </>
  )
}

export default RewardList