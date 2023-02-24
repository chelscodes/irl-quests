import React from "react"
import RewardTile from "./RewardTile"
import updateRewardStatus from "../../services/apiClient/updateRewardStatus"
import deleteReward from "../../services/apiClient/deleteReward"

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

  const handleDelete = async (rewardId) => {
    const confirmation = await deleteReward(rewardId)
    if (confirmation) {
      const updatedRewards = rewards.filter((reward) => {
        return reward.id !== rewardId
      })
      setRewards(updatedRewards)
    }
  }

  const rewardTiles = rewards.map((reward) => {
    return (
      <RewardTile
        key={reward.id}
        reward={reward}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
        currentPoints={props.currentPoints}
      />
    )
  })

  return (
    <div className="list">
      <h3 className="header list__header">REWARDS</h3>
      {rewardTiles}
    </div>
  )
}

export default RewardList