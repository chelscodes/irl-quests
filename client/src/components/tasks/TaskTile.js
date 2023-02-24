import React from "react";
import getTaskPoints from "../../services/getTaskPoints";

const TaskTile = (props) => {
  const { id, name, difficulty, completed } = props.task
  const handleToggle = props.handleToggle
  const handleDelete = props.handleDelete

  let styling = ""
  if (completed) {
    styling += "task--completed "
  }

  const points = getTaskPoints(difficulty)
  const handleDeleteClick = () => handleDelete(id)

  return (
    <>
      <div className="task">
        <label className={styling}>
          <input 
            id={id}
            type="checkbox"
            defaultChecked={completed}
            onChange={() => handleToggle(id, completed)}
          />
          {name} <span className="bold--yellow">{points}pts</span>
        </label>
      </div>
      <div className="grid-x grid-margin-x section__modify-buttons">
        <button className="cell button__delete" onClick={handleDeleteClick}>delete</button>
      </div>
    </>
  )
}

export default TaskTile