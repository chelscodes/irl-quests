import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { TiArrowBack } from "react-icons/ti"
import TaskArea from "../tasks/TaskArea"
import RewardArea from "../rewards/RewardArea"

import Points from "../../services/Points"


const QuestShow = (props) => {
  const [quest, setQuest] = useState({
    name: "",
    description: "",
  })
  const [tasks, setTasks] = useState([])
  const [rewards, setRewards] = useState([])
  const [currentPoints, setCurrentPoints] = useState(0)

  const questId = props.match.params.id
  const getQuestData = async () => {
    try {
      const response = await fetch(`/api/v1/quests/${questId}`)
      if (!response.ok) {
        const error = new Error(`${response.status} (${response.statusText})`)
        throw(error)
      }
      const body = await response.json()
      const { name, description, tasks, rewards } = body.quest
      setQuest({ name, description })
      setTasks(tasks)
      setRewards(rewards)
    } catch (error) {
      console.error(`Fetch didn't happen: ${error.message}`)
    }
  }

  useEffect(() => {
    getQuestData()
  }, [])

  const calculatedPoints = Points.getQuestCurrentPoints(tasks, rewards)
  if (calculatedPoints !== currentPoints) {
    setCurrentPoints(calculatedPoints)
  }
  
  return (
    <div className="text-center">
      <div className="grid-x">
        <div className="cell medium-1 hide-for-small-only back-icon">
          <Link to="/user-summary">
            <TiArrowBack /> Back
          </Link>
        </div>
        <div className="cell medium-10">
          <h2 className="header header--quest-title">{quest.name}</h2>
          <p>current reward pts: <span className="bold--yellow">{currentPoints}</span></p>
        </div>
      </div>
      <div className="grid-x">
        <p className="cell large-4 large-offset-4 quest__description">{quest.description}</p>
      </div>
      <div className="grid-x grid-margin-x">
        <div className="cell small-10 large-4 small-offset-1 large-offset-2">
          <TaskArea tasks={tasks} setTasks={setTasks} questId={questId} />
        </div>
        <div className="cell small-10 large-4 small-offset-1 large-offset-0">
          <RewardArea 
            rewards={rewards} 
            setRewards={setRewards} 
            questId={questId} 
            currentPoints={currentPoints} 
          />
        </div>
      </div>
    </div>
  )
}

export default QuestShow