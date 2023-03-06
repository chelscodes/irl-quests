import React from "react"
import { Link } from "react-router-dom"

const QuestTile = (props) => {
  const { name, id } = props.quest

  const handleDeleteClick = () => props.handleDelete(id)

  return (
    <>
      <Link to={`/quests/${id}`} >
        <div className="quest-list-item">
          {name}
        </div>
      </Link>
      <div className="grid-x section__modify-buttons">
        <button className="cell button__delete" onClick={handleDeleteClick}>delete</button>
      </div>
    </>
  )
}

export default QuestTile