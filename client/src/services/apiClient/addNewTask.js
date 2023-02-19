const addNewTask = async (newTaskInput, questId) => {
  const newTaskData = {newTaskInput, questId}
  try {
    const response = await fetch("/api/v1/tasks", {
      method: "post",
      body: JSON.stringify(newTaskData),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw(error)
    }
    const body = await response.json()
    return body.newTask
  } catch (error) {
    console.error(`Fetch didn't happen: ${error.message}`)
  }
}

export default addNewTask