import React, { useState, useEffect } from "react"
import DataVisTimeRange from "./DataVisTimeRange"
import QuestForm from "./quests/QuestForm"
import QuestList from "./quests/QuestList"

const UserSummary = (props) => {
  const [quests, setQuests] = useState([])
  const [userStats, setUserStats] = useState()
  const [showQuestForm, setShowQuestForm] = useState(false)
  
  const getQuestsData = async () => {
    try {
      const response = await fetch("/api/v1/users/user-summary")
      if (!response.ok) {
        const error = new Error(`${response.status} (${response.statusText})`)
        throw(error)
      }
      const body = await response.json()
      setUserStats({timeRangeTasksCompleted: body.userSummary.stats})
      setQuests(body.userSummary.quests)
    } catch (error) {
      console.error(`Fetch didn't happen: ${error.message}`)
    }
  }

  useEffect(() => {
    getQuestsData()
  }, [])
  
  const toggleQuestForm = () => {
    setShowQuestForm(!showQuestForm)
  }

  let newQuestToggle
  if (!showQuestForm) {
    newQuestToggle = <button type="button"
      className="button button__shadow button__shadow--blue"
      onClick={toggleQuestForm}>
        Add Quest
      </button>
  } else {
    newQuestToggle = <QuestForm 
      quests={quests}
      setQuests={setQuests}
      showQuestForm={showQuestForm}
      setShowQuestForm={setShowQuestForm} />
  }

  const username = props.user?.username
  
  let dataVisualizationComponent
  if (userStats) {
    dataVisualizationComponent = <DataVisTimeRange userStats={userStats.timeRangeTasksCompleted} />
  }

  return (
    <>
      <h2 className="header text-center summary">Summary</h2>
      <div className="grid-x grid-margin-x summary__body">
        <div className="cell small-12 medium-4 large-3 small-offset-2 large-offset-2">
          <h4 className="subheader">Welcome back, {username}!</h4>
          {dataVisualizationComponent}
        </div>
        <div className="cell small-12 medium-5 large-4 large-offset-1">
          <QuestList quests={quests} setQuests={setQuests} />
          {newQuestToggle}
        </div>
      </div>
    </>
  )
}

export default UserSummary