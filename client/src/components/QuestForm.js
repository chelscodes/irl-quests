import React, { useState } from "react";
import { Redirect } from "react-router-dom";

let newQuestId = null

const QuestForm = (props) => {
  const [newQuest, setNewQuest] = useState({
    name: "",
    description: ""
  })

  const [shouldRedirect, setShouldRedirect] = useState(false)
  

  const addNewQuest = async () => {
    try {
      const response = await fetch("/api/v1/quests", {
        method: "post",
        body: JSON.stringify(newQuest),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      } else {
        const body = await response.json()
        newQuestId = body.quest.id
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Fetch didn't happen: ${error.message}`)
    }
  }
  
  const handleInputChange = (event) => {
    setNewQuest({
      ...newQuest,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    addNewQuest()
  }
  
  if (shouldRedirect) {
    return <Redirect push to={`/quests/${newQuestId}`} />
  }

  return (
    <>
      <h2 className="header text-center">Create a New Quest</h2>
      <div>
        <form className="form-section form-section--outline" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" value={newQuest.name} onChange={handleInputChange} />
          </label>
          <label>
            Description
            <input type="text" name="description" value={newQuest.description} onChange={handleInputChange} />
          </label>
          <div className="text-center">
            <input type="submit" className="button" value="Begin your quest!" />
          </div>
        </form>
      </div>
    </>
  )
}

export default QuestForm