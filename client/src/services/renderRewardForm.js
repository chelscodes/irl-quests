import React from "react"
import RewardForm from "../components/RewardForm"

const renderRewardForm = (showRewardForm, rewardFormProps) => {
  let newRewardFormOutput
  
  newRewardFormOutput = <RewardForm 
    rewards={rewardFormProps.rewards}
    setRewards={rewardFormProps.setRewards}
    questId={rewardFormProps.questId}
    setShowRewardForm={rewardFormProps.setShowRewardForm}
  />

  return newRewardFormOutput
}

export default renderRewardForm