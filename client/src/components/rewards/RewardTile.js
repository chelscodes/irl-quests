import React from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { MdDragIndicator } from "react-icons/md";

import getRewardPoints from "../../services/getRewardPoints"

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

  const points = getRewardPoints(motivationLevel)
  const handleClick = () => handleToggle(id, used)
  const handleDeleteClick = () => handleDelete(id)

  let rewardClass = ""
  let accessHandleClick = null
  let undoButton = <span className="cell small-4"></span>
  if (used || currentPoints < points) {
    rewardClass += "reward--used"
    if (used) {
      undoButton = <button className="cell small-4 button__undo" onClick={handleClick}>undo</button>
    }
  } else {
    accessHandleClick = handleClick
  }
  
  return (
    <div ref={setNodeRef} style={style}>
      <div className={`grid-x align-center-middle reward ${rewardClass}`} onClick={accessHandleClick}>
        <div className="cell small-11">
          <p className="reward__text">{name}: {points}</p>
        </div>
        <div className="task__drag-icon cell small-1" {...attributes} {...listeners}>
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