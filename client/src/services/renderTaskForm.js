import React from "react"
import TaskForm from "../components/TaskForm"

const renderTaskForm = (showTaskForm, setShowTaskForm, taskFormProps) => {
  let newTaskFormOutput
  if (!showTaskForm) {
    newTaskFormOutput = <button type="button"
      className="button button__shadow button__shadow--blue"
      onClick={() => {setShowTaskForm(true)}}>Add Task
    </button>
  } else {
    newTaskFormOutput = <TaskForm 
      tasks={taskFormProps.tasks} 
      setTasks={taskFormProps.setTasks} 
      questId={taskFormProps.questId}
      setShowTaskForm={taskFormProps.setShowTaskForm} 
    />
  }
  return newTaskFormOutput
}

export default renderTaskForm