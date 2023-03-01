import React, { useState } from "react"
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import RewardList from "./RewardList"

import renderRewardForm from "../../services/renderRewardForm"
import updateRewardStatus from "../../services/apiClient/updateRewardStatus"
import deleteReward from "../../services/apiClient/deleteReward"

const RewardArea = (props) => {
  const [showRewardForm, setShowRewardForm] = useState(false)
  const { rewards, setRewards, questId, currentPoints } = props

  const usedRewards = rewards.filter((reward) => {
    return reward.used === true
  })
  const unusedRewards = rewards.filter((reward) => {
    return reward.used === false
  })

  const rewardFormProps = {
    rewards: rewards, 
    setRewards: setRewards, 
    questId: questId, 
    setShowRewardForm: setShowRewardForm
  }
  const newRewardForm = renderRewardForm(showRewardForm, setShowRewardForm, rewardFormProps)

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

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setRewards((items) => {
        const activeIndex = items.findIndex(item => item.id === active.id)
        const overIndex = items.findIndex(item => item.id === over.id)
        return arrayMove(items, activeIndex, overIndex)
      })
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="list">
        <h3 className="header list__header">REWARDS</h3>
        <RewardList
          conditionalRewards={unusedRewards} 
          title={"Available"}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
          currentPoints={currentPoints}
        />
        {newRewardForm}
      </div>
      <div>
        <RewardList
          conditionalRewards={usedRewards} 
          title={"Used"}
          rewards={rewards} 
          setRewards={setRewards} 
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />
      </div>
    </DndContext>
  )
}

export default RewardArea