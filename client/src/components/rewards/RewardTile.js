import React from "react";
import getRewardPoints from "../../services/getRewardPoints"

const RewardTile = (props) => {
  const { id, name, motivationLevel, used } = props.reward
  const { handleToggle, handleDelete, currentPoints } = props
  const points = getRewardPoints(motivationLevel)

  const handleClick = () => handleToggle(id, used)
  const handleDeleteClick = () => handleDelete(id)

  let rewardClass = ""
  let accessHandleClick = null
  let undoButton = <span className="cell small-4"></span>
  if (used || currentPoints < points) {
    rewardClass += " reward--used button disabled"
    if (used) {
      undoButton = <button className="cell small-4 button__undo" onClick={handleClick}>undo</button>
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
      <div className="grid-x section__modify-buttons">
        <span className="cell small-4"></span>
        {undoButton}
        <button className="cell small-4 button__delete" onClick={handleDeleteClick}>delete</button>
      </div>
    </>
  )
}

export default RewardTile