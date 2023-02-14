import React, { useState, useEffect } from "react"

const QuestShow = (props) => {
  const [quest, setQuest] = useState({
    name: "",
    description: "",
    currentPoints: ""
  })

  const questId = props.match.params.id
  const getQuestData = async () => {
    try {
      const response = await fetch(`/api/v1/quests/${questId}`)
      if (!response.ok) {
        const error = new Error(`${response.status}: ${response.statusText}`)
        throw(error)
      }
      const body = await response.json()
      setQuest(body.quest)
    } catch (error) {
      console.log(`Fetch didn't happen: ${error.message}`)
    }
  }

  useEffect(() => {
    getQuestData()
  }, [])

  return (
    <div className="text-center">
      <h2 className="header">{quest.name}</h2>
      <p>Your current points: {quest.currentPoints}</p>
      <p className="quest-description">{quest.description}</p>
    </div>
  )
}

export default QuestShow