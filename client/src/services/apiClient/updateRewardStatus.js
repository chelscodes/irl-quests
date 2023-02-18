const updateRewardStatus = async (id, updatedUsedStatus) => {
  try {
    const response = await fetch(`/api/v1/rewards/${id}`, {
      method: "PATCH",
      body: JSON.stringify({updatedUsedStatus}),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    if(!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw(error)
    }
    const body = await response.json()
    return body.updatedReward
  } catch (error) {
    console.error(`Fetch didn't happen: ${error.message}`)
  }
}

export default updateRewardStatus