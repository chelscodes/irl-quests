const updateTaskStatus = async (taskId, updatedCompletedStatus) => {
  try {
    const response = await fetch(`/api/v1/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({updatedCompletedStatus}),
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
    return body.updatedTask
  } catch (error) {
    console.error(`Fetch didn't happen: ${error.message}`)
  }
}

export default updateTaskStatus