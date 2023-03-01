import express from "express"
import objection from "objection"
const { ValidationError } = objection
import { Task } from "../../../models/index.js"
import TaskSerializer from "../../../serializers/TaskSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const tasksRouter = new express.Router()

tasksRouter.post("/", async (req, res) => {
  const cleanedTaskInput = cleanUserInput(req.body.newTaskInput)

  const { name, difficulty } = cleanedTaskInput
  const questId = req.body.questId
  const userId = req.user.id
  try {
    const persistedTask = await Task.query().insertAndFetch({
      name, difficulty, questId, userId
    })
    const serializedTask = TaskSerializer.getSummary(persistedTask)
    return res.status(201).json({ newTask: serializedTask })
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(error)
      return res.status(422).json({ errors: error.data })
    }
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

tasksRouter.patch("/:taskId", async (req, res) => {
  const taskId = req.params.taskId
  const updatedCompletedStatus = req.body.updatedCompletedStatus
  try {
    const updatedTask = await Task.query().patchAndFetchById(taskId, {
      completed: updatedCompletedStatus
    })
    const serializedTask = TaskSerializer.getSummary(updatedTask)
    return res.status(200).json({ updatedTask: serializedTask })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

tasksRouter.delete("/:id", async (req,res) => {
  const taskId = req.params.id
  try {
    const rowsDeleted = await Task.query().deleteById(taskId)
    if (rowsDeleted === 1) {
      return res.status(200).json("Task was successfully deleted!")
    }
    return res.status(404).json({ errors: "Task not found" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default tasksRouter