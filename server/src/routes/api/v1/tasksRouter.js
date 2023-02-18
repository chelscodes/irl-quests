import express from "express"
import { Task } from "../../../models/index.js"
import TaskSerializer from "../../../serializers/TaskSerializer.js"

const tasksRouter = new express.Router()

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

export default tasksRouter