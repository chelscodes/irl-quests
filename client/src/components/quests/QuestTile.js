import React from "react"
import { Link } from "react-router-dom"

const QuestTile = (props) => {
  const { name, id } = props.quest

  const handleDeleteClick = () => props.handleDelete(id)

  return (
    <>
      <div className="quest-list-item">
        <Link to={`/quests/${id}`} >{name}</Link>
      </div>
      <div className="grid-x grid-margin-x section__modify-buttons">
        <button className="cell button__delete" onClick={handleDeleteClick}>delete</button>
      </div>
    </>
  )
}

export default QuestTile