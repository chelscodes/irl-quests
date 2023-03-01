import React from "react"
import QuestTile from "./QuestTile"
import deleteQuest from "../../services/apiClient/deleteQuest"

const QuestList = (props) => {
  const { quests, setQuests } = props

  const handleDelete = async (questId) => {
    const confirmation = await deleteQuest(questId)
    if (confirmation) {
      const updatedQuests = quests.filter((quest) => {
        return quest.id !== questId
      })
      setQuests(updatedQuests)
    }
  }
  
  const questTiles = quests.map((quest) => {
    return <QuestTile key={quest.id} quest={quest} handleDelete={handleDelete} />
  })

  return (
    <div className="list">
      <h3 className="header list__header text-center">ACTIVE QUESTS</h3>
      {questTiles}
    </div>
  )
}

export default QuestList