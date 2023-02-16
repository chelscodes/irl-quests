import React, { useEffect, useState } from "react";
import TaskTile from "./TaskTile";

const TaskList = (props) => {
  const { tasks } = props

  const taskTiles = tasks.map(task => {
    return (
      <TaskTile key={task.id} task={task} />
    )
  })

  return (
    <>
      <h3>Tasks</h3>
      {taskTiles}
    </>
  )
}

export default TaskList