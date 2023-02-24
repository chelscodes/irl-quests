const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`/api/v1/tasks/${taskId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    if (!response) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw(error)
    }
    const body = await response.json()
    console.log(body)
    return true
  } catch (error) {
    console.error(`Fetch didn't happen: ${error.message}`)
    return false
  }
}

export default deleteTask