import React from "react";
import getTaskPoints from "../../services/getTaskPoints";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdDragIndicator } from "react-icons/md";

const TaskTile = (props) => {
  const { id, name, difficulty, completed } = props.task
  const { handleToggle, handleDelete } = props
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  let styleCompletedTaskBox = ""
  let styleCompletedTaskName = ""
  if (completed) {
    styleCompletedTaskBox = "task--completed"
    styleCompletedTaskName = "task__name--completed "
  }

  const points = getTaskPoints(difficulty)
  const handleDeleteClick = () => handleDelete(id)

  return (
    <div ref={setNodeRef} style={style}>
      <div className={`grid-x task ${styleCompletedTaskBox}`}>
        <div className="cell small-9">
          <label className={`${styleCompletedTaskName}`}>
            <input 
              id={id}
              type="checkbox"
              defaultChecked={completed}
              onChange={() => handleToggle(id, completed)}
            />
            {name}
          </label>
        </div>
        <div className="cell small-2">
          <p className="task__points bold--yellow">{points}pts</p>
        </div>
        <div className="cell small-1" {...attributes} {...listeners}>
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