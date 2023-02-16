class TaskSerializer {
  static async getSummary(task) {
    const allowedAttributes = ["id", "name", "difficulty", "points", "completed"]

    let serializedTask = {}
    for (const attribute of allowedAttributes) {
      serializedTask[attribute] = task[attribute]
    }

    return serializedTask
  }
}

export default TaskSerializer