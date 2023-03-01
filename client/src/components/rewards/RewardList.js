import React from "react"
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import RewardTile from "./RewardTile"


const RewardList = (props) => {
  const { conditionalRewards, handleToggle, handleDelete, currentPoints } = props
  
  const rewardTiles = conditionalRewards.map((reward) => {
    return (
      <RewardTile
        key={reward.id}
        reward={reward}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
        currentPoints={currentPoints}
      />
    )
  })

  return (
    <>
      <SortableContext
        items={conditionalRewards}
        strategy={verticalListSortingStrategy}
      >
        {rewardTiles}
      </SortableContext>
    </>
  )
}

export default RewardList