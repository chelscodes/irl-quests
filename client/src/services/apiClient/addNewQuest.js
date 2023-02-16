const addNewQuest = async (newQuest) => {
  try {
    const response = await fetch("/api/v1/quests", {
      method: "post",
      body: JSON.stringify(newQuest),
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
    return body.quest.id
  } catch (error) {
    console.error(`Fetch didn't happen: ${error.message}`)
  }
}

export default addNewQuest