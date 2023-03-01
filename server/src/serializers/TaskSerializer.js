import { format } from "date-fns"

class TaskSerializer {
  static getSummary(task) {
    const allowedAttributes = ["id", "name", "difficulty", "completed"]

    let serializedTask = {}
    for (const attribute of allowedAttributes) {
      serializedTask[attribute] = task[attribute]
    }

    return serializedTask
  }

  static getFormattedUpdatedAt(task) {
    const updatedAtDate = task["updatedAt"]
    const formattedUpdatedAt = format(updatedAtDate, "yyyy-MM-dd")
    return formattedUpdatedAt
  }
}

export default TaskSerializer