import React, { useState, useEffect } from "react"
import getQuestCurrentPoints from "../services/getQuestCurrentPoints"
import renderRewardForm from "../services/renderRewardForm"
import renderTaskForm from "../services/renderTaskForm"
import RewardList from "./RewardList"
import TaskList from "./TaskList"

const QuestShow = (props) => {
  const [quest, setQuest] = useState({
    name: "",
    description: "",
  })
  const [tasks, setTasks] = useState([])
  const [rewards, setRewards] = useState([])
  const [currentPoints, setCurrentPoints] = useState(0)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showRewardForm, setShowRewardForm] = useState(false)

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

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm)
  }

  const taskFormProps = {
    tasks: tasks,
    setTasks: setTasks,
    questId: questId,
    setShowTaskForm: setShowTaskForm
  }
  const newTaskForm = renderTaskForm(showTaskForm, toggleTaskForm, taskFormProps)
  
  const rewardFormProps = {
    rewards: rewards, 
    setRewards: setRewards, 
    questId: questId, 
    setShowRewardForm: setShowRewardForm
  }
  const newRewardForm = renderRewardForm(showRewardForm, rewardFormProps)

  const calculatedPoints = getQuestCurrentPoints(tasks, rewards)
  if (calculatedPoints !== currentPoints) {
    setCurrentPoints(calculatedPoints)
  }
  
  return (
    <div className="text-center">
      <h2 className="header header--quest-title">{quest.name}</h2>
      <p>current reward pts: <span className="bold--yellow">{currentPoints}</span></p>
      <p className="quest__description">{quest.description}</p>
      <div className="grid-x grid-margin-x">
        <div className="cell small-10 large-5 small-offset-1">
          <TaskList tasks={tasks} setTasks={setTasks} />
          {newTaskForm}
        </div>
        <div className="cell small-10 large-5 small-offset-1">
          <RewardList rewards={rewards} setRewards={setRewards} />
          {newRewardForm}
        </div>
      </div>
    </div>
  )
}

export default QuestShow