const addNewReward = async (newRewardInput, questId) => {
  const newRewardData = {newRewardInput, questId}
  try {
    const response = await fetch("/api/v1/rewards", {
      method: "post",
      body: JSON.stringify(newRewardData),
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
    return body.newReward
  } catch (error) {
    console.error(`Fetch didn't happen: ${error.message}`)
  }
}

export default addNewReward