import React from "react";
import TaskTile from "./TaskTile";
import updateTaskStatus from "../../services/apiClient/updateTaskStatus";
import deleteTask from "../../services/apiClient/deleteTask";

const TaskList = (props) => {
  const { tasks, setTasks } = props

  const handleToggle = async (taskId, completedStatus) => {
    const updatedCompletedStatus = !completedStatus
    await updateTaskStatus(taskId, updatedCompletedStatus)

    const updatedTasks = tasks.map((task) => {
      if (taskId === task.id) {
        return {
          ...task, 
          completed: !task.completed
        }
      }
      return task
    })

    setTasks(updatedTasks)
  }

  const handleDelete = async (taskId) => {
    const confirmation = await deleteTask(taskId)
    if (confirmation) {
      const updatedTasks = tasks.filter((task) => {
        return task.id !== taskId
      })
      setTasks(updatedTasks)
    }
  }
  
  const taskTiles = tasks.map((task) => {
    return (
      <TaskTile 
        key={task.id} 
        task={task} 
        handleToggle={handleToggle} 
        handleDelete={handleDelete}
      />
    )
  })
    
  return (
    <div className="list">
      <h3 className="header list__header">TASKS</h3>
      {taskTiles}
    </div>
  )
}

export default TaskList