import React, { useState, useEffect } from "react"
import DataVisTimeRange from "./DataVisTimeRange"
import QuestForm from "./quests/QuestForm"
import QuestList from "./quests/QuestList"
import { FiUser } from "react-icons/fi"
import translateCompletedQuests from "../services/translateCompletedQuests"

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
      const stats = body.userSummary.stats
      setUserStats({...stats})
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
  let completedQuestsMessage
  if (userStats) {
    completedQuestsMessage = translateCompletedQuests(userStats.questsCompleted) 
    dataVisualizationComponent = <DataVisTimeRange 
      tasksTimeRange={userStats.tasksTimeRange} 
      totalTasks={userStats.tasksCompleted} 
    />
  }

  return (
    <>
      <div className="grid-x grid-margin-x">
        <h2 className="header summary__header cell small-10 large-offset-1">
          WELCOME BACK
        </h2>
      </div>
      <div className="grid-x grid-margin-x summary__body">
        <div className="cell small-10 large-4 small-offset-1 large-offset-1">
          <div className="grid-x grid-margin-x subheader">
            <div className="cell small-2">
              <span><FiUser /></span> 
            </div>
            <div className="cell small-9">
              <h4>Hi, {username}!</h4>
              <p>{completedQuestsMessage}</p>
            </div>
          </div>
          {dataVisualizationComponent}
        </div>
        <div className="cell small-10 large-4 small-offset-1 large-offset-2 text-center">
          <QuestList quests={quests} setQuests={setQuests} />
          {newQuestToggle}
        </div>
      </div>
    </>
  )
}

export default UserSummary