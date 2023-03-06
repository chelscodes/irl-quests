import React, { useState } from "react"
import FormError from "../layout/FormError"
import { AiFillCloseCircle } from "react-icons/ai";
import translateTaskDifficulty from "../../services/translateTaskDifficulty"
import FormValidations from "../../services/FormValidations"
import addNewTask from "../../services/apiClient/addNewTask"

const TaskForm = (props) => {
  const { tasks, setTasks, questId } = props
  const [newTask, setNewTask] = useState({
    name: "",
    difficulty: 1
  })

  const [errors, setErrors] = useState({})

  const clearForm = () => {
    setNewTask({
      name: "",
      difficulty: 1
    })
    setErrors({})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrors({})
    const potentialErrors = FormValidations.nameRequired(newTask)
    setErrors(potentialErrors)

    if (Object.keys(potentialErrors).length === 0) {
      const persistedTask = await addNewTask(newTask, questId)
      const newTasksArray = [...tasks, persistedTask]
      setTasks(newTasksArray)
      clearForm()
    }
  }

  const handleInput = (event) => {
    setNewTask({
      ...newTask,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const translatedDifficulty = translateTaskDifficulty(newTask.difficulty)

  return (
    <div className="form__section form__section--outline">
      <div className="close-icon" onClick={() => {props.setShowTaskForm(false)}}>
        <AiFillCloseCircle />
      </div>
      <h4 className="header">Add a New Task</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input 
            type="text" 
            name="name" 
            placeholder="Write a task name"
            value={newTask.name} 
            onChange={handleInput} 
          />
          <FormError error={errors.name} />
        </label>
        <label>
          Difficulty: {translatedDifficulty}<br/>
          <input 
            type="range" 
            name="difficulty" 
            min="1"
            max="4"
            value={newTask.difficulty} 
            onChange={handleInput} 
          />
        </label>
        <input 
          type="submit" 
          className="button button__shadow button__shadow--blue" 
          value="Add Task" 
        />
        <button 
          type="button"
          className="button__delete"
          onClick={clearForm}
        >Clear</button>
      </form>
    </div>
  )
}

export default TaskForm