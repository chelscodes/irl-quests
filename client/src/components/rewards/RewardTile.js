import React from "react";
import getRewardPoints from "../../services/getRewardPoints"

const RewardTile = (props) => {
  const { id, name, motivationLevel, used } = props.reward
  const { handleToggle, currentPoints } = props
  const points = getRewardPoints(motivationLevel)

  const handleClick = () => handleToggle(id, used)

  let rewardClass = ""
  let accessHandleClick = null
  let undoButton = null
  if (used || currentPoints < points) {
    rewardClass += " reward--used button disabled"
    if (used) {
      undoButton = <button className="button__undo" onClick={handleClick}>undo</button>
    }
  } else {
    rewardClass += " reward button"
    accessHandleClick = handleClick
  }
  
  return (
    <>
      <div className={`${rewardClass}`} onClick={accessHandleClick}>
        <p className="reward__text">{name}: {points}</p>
      </div>
      {undoButton}
    </>
  )
}

export default RewardTile