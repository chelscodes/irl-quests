import React, { useState, useEffect } from "react"
import QuestList from "./QuestList"

const UserSummary = (props) => {
  const [quests, setQuests] = useState([])
  
  const getQuestsData = async () => {
    try {
      const response = await fetch("/api/v1/quests")
      if (!response.ok) {
        const error = new Error(`${response.status} (${response.statusText})`)
        throw(error)
      }
      const body = await response.json()
      setQuests(body.quests)
    } catch (error) {
      console.error(`Fetch didn't happen: ${error.message}`)
    }
  }

  useEffect(() => {
    getQuestsData()
  }, [])
  
  const username = props.user?.username
  
  return (
    <>
      <h2 className="header text-center summary">Summary</h2>
      <div className="grid-x grid-margin-x summary__body">
        <div className="cell small-12 medium-4 large-3 small-offset-2 large-offset-2">
          <h5 className="subheader">Welcome back, {username}!</h5>
        </div>
        <div className="cell small-12 medium-5 large-4 large-offset-1">
          <QuestList quests={quests} />
        </div>
      </div>
    </>
  )
}

export default UserSummary