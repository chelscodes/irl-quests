import React from "react"
import { Link } from "react-router-dom"

const QuestTile = (props) => {
  const { name, id } = props.quest

  return (
    <div className="quest-list-item">
      <Link to={`/quests/${id}`} >{name}</Link>
    </div>
  )
}

export default QuestTile