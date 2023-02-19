import React from "react";
import getTaskPoints from "../services/getTaskPoints";

const TaskTile = (props) => {
  const { id, name, difficulty, completed } = props.task
  const handleToggle = props.handleToggle

  let styling = ""
  if (completed) {
    styling += "task--completed "
  }

  const points = getTaskPoints(difficulty)

  return (
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
  )
}

export default TaskTile