import React, { useState } from "react";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import FormPopup from "../layout/Popup";

// import renderTaskForm from "../../services/renderTaskForm";
import updateTaskStatus from "../../services/apiClient/updateTaskStatus";
import deleteTask from "../../services/apiClient/deleteTask";

const TaskArea = (props) => {
  // const [showTaskForm, setShowTaskForm] = useState(false)
  const { tasks, setTasks, questId } = props

  const completedTasks = tasks.filter((task) => {
    return task.completed === true
  })
  const uncompletedTasks = tasks.filter((task) => {
    return task.completed === false
  })

  // const taskFormProps = {
  //   tasks: tasks,
  //   setTasks: setTasks,
  //   questId: questId,
  //   setShowTaskForm: setShowTaskForm
  // }
  const newTaskForm = <TaskForm 
      tasks={tasks} 
      setTasks={setTasks} 
      questId={questId}
    />
  
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

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setTasks((items) => {
        const activeIndex = items.findIndex(item => item.id === active.id)
        const overIndex = items.findIndex(item => item.id === over.id)
        return arrayMove(items, activeIndex, overIndex)
      })
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="list">
        <h3 className="header list__header">TASKS</h3>
        <TaskList 
          conditionalTasks={uncompletedTasks} 
          title={"To Do"}
          tasks={tasks} 
          setTasks={setTasks} 
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />
        {/* {newTaskForm} */}
        <FormPopup popUpContent={newTaskForm} title={"Add a New Task"} />
      </div>
      <div>
        <TaskList 
          conditionalTasks={completedTasks} 
          title={"Completed"}
          tasks={tasks}
          setTasks={setTasks} 
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />
      </div>
    </DndContext>
  )
}

export default TaskArea