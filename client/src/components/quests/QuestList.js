import React from "react"
import QuestTile from "./QuestTile"

const QuestList = (props) => {
  const quests = props.quests
  
  const questTiles = quests.map((quest) => {
    return <QuestTile key={quest.id} quest={quest} />
  })

  return (
    <div className="list">
      <h3 className="header list__header text-center">QUESTS</h3>
      {questTiles}
    </div>
  )
}

export default QuestList