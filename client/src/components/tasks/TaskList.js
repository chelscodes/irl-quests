import React from "react";
import TaskTile from "./TaskTile";
import updateTaskStatus from "../../services/apiClient/updateTaskStatus";
import deleteTask from "../../services/apiClient/deleteTask";
import {
  DndContext, 
  closestCenter,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';


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
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="list">
        <h3 className="header list__header">TASKS</h3>
        <SortableContext
          items={tasks}
          strategy={verticalListSortingStrategy}
        >
          {taskTiles}
        </SortableContext>
      </div>
    </DndContext>
  )
}

export default TaskList