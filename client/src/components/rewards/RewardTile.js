import React from "react"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { MdDragIndicator } from "react-icons/md"
import { FiLock, FiUnlock } from "react-icons/fi"

import Points from "../../services/Points"

const RewardTile = (props) => {
  const { id, name, motivationLevel, used } = props.reward
  const { handleToggle, handleDelete, currentPoints } = props
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition 
  } = useSortable({ id })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const points = Points.getRewardPoints(motivationLevel)
  const handleClick = () => handleToggle(id, used)
  const handleDeleteClick = () => handleDelete(id)

  let rewardClass = ""
  let accessHandleClick = null
  let undoButton = <span className="cell small-4"></span>
  let lock = ""
  if (used) {
    rewardClass = "reward--used"
    undoButton = <button className="cell small-4 button__undo" onClick={handleClick}>undo</button>
  } else if (currentPoints < points) {
    rewardClass = "reward--locked"
    lock = <FiLock />
  } else {
    lock = <FiUnlock />
    accessHandleClick = handleClick
  }
  
  return (
    <div ref={setNodeRef} style={style}>
      <div className={`grid-x align-center-middle reward ${rewardClass}`} onClick={accessHandleClick}>
        <div className="cell small-1 reward--locked-icon">
          {lock}
        </div>
        <div className="cell small-8 reward__text">
          <p>{name}</p>
        </div>
        <div className="cell small-2 reward__points">
         <p>{points}pts</p>
        </div>
        <div className="reward__drag-icon cell small-1" {...attributes} {...listeners}>
          <MdDragIndicator />
        </div>
      </div>
      <div className="grid-x section__modify-buttons">
        <div className="cell small-4"></div>
        {undoButton}
        <button className="cell small-4 button__delete" onClick={handleDeleteClick}>delete</button>
      </div>
    </div>
  )
}

export default RewardTile