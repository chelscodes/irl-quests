import React from "react"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { MdDragIndicator } from "react-icons/md"
import { FiSquare, FiCheckSquare } from "react-icons/fi"

import Points from "../../services/Points"


const TaskTile = (props) => {
  const { id, name, difficulty, completed } = props.task
  const { handleToggle, handleDelete } = props
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

  let styleCompletedTaskBox = ""
  let styleCompletedTaskName = ""
  let checkboxIcon = <FiSquare />
  let stylePointsColor = "bold--yellow"
  if (completed) {
    styleCompletedTaskBox = "task--completed"
    styleCompletedTaskName = "task__name--completed "
    checkboxIcon = <FiCheckSquare />
    stylePointsColor = ""
  }

  const points = Points.getTaskPoints(difficulty)
  const handleToggleClick = () => handleToggle(id, completed)
  const handleDeleteClick = () => handleDelete(id)

  return (
    <div ref={setNodeRef} style={style}>
      <div className={`grid-x align-center-middle task ${styleCompletedTaskBox}`}>
        <div className="task__checkbox cell small-1" onClick={handleToggleClick}>
          {checkboxIcon}
        </div>
        <div className="cell small-8" onClick={handleToggleClick}>
          <p className={`task__name ${styleCompletedTaskName}`}>{name}</p>
        </div>
        <div className="cell small-2">
          <p className={`task__points ${stylePointsColor}`}>+{points}pts</p>
        </div>
        <div className="task__drag-icon cell small-1" {...attributes} {...listeners}>
          <MdDragIndicator />
        </div>
      </div>
      <div className="grid-x section__modify-buttons">
        <button className="cell button__delete" onClick={handleDeleteClick}>delete</button>
      </div>
    </div>
  )
}

export default TaskTile