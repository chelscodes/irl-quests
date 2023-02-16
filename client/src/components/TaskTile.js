import React from "react";

const TaskTile = (props) => {
  const { name, points } = props.task

  return (
    <div>
      <label>
        <input type="checkbox" />
        {name}: {points}
      </label>
    </div>
  )
}

export default TaskTile