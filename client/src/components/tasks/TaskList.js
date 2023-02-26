import React from "react";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import TaskTile from "./TaskTile";


const TaskList = (props) => {
  const { handleToggle, handleDelete, conditionalTasks } = props

  const taskTiles = conditionalTasks.map((task) => {
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
    <>
      <SortableContext
        items={conditionalTasks}
        strategy={verticalListSortingStrategy}
      >
        {taskTiles}
      </SortableContext>
    </>
  )
}

export default TaskList