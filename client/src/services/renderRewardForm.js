import React from "react"
import RewardForm from "../components/RewardForm"

const renderRewardForm = (showRewardForm, setShowRewardForm, rewardFormProps) => {
  let newRewardFormOutput

  if (!showRewardForm) {
    newRewardFormOutput = <button type="button"
      className="button button__shadow button__shadow--blue"
      onClick={() => {setShowRewardForm(true)}}>Add Reward
    </button>
  } else {
    newRewardFormOutput = <RewardForm 
      rewards={rewardFormProps.rewards}
      setRewards={rewardFormProps.setRewards}
      questId={rewardFormProps.questId}
      setShowRewardForm={rewardFormProps.setShowRewardForm}
    />
  }

  return newRewardFormOutput
}

export default renderRewardForm