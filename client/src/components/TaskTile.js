import React from "react";
import getTaskPoints from "../services/getTaskPoints";

const TaskTile = (props) => {
  const { id, name, difficulty, completed } = props.task
  const handleToggle = props.handleToggle

  let styling = ""
  if (completed) {
    styling += "task--completed "
  }
  // switch (difficulty) {
  //   case (1):
  //     styling += "task--trivial "
  //     break
  //   case (2):
  //     styling += "task--easy "
  //     break
  //   case (3):
  //     styling += "task--medium "
  //     break
  //   case (4):
  //     styling += "task--hard "
  //     break
  // }

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