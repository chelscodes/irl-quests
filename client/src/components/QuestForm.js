import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import FormError from "./layout/FormError";

let newQuestId = null

const QuestForm = (props) => {
  const [newQuest, setNewQuest] = useState({
    name: "",
    description: ""
  })

  const [errors, setErrors] = useState({})

  const [shouldRedirect, setShouldRedirect] = useState(false)
  
  const validateInput = (formInput) => {
    setErrors({})
    const { name } = formInput
    let newErrors = {}

    if (name.trim() === "") {
      newErrors = {
        ...newErrors,
        name: "is required"
      }
    }
    setErrors(newErrors)
    return newErrors
  }

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
      }
      const body = await response.json()
      newQuestId = body.quest.id
      setShouldRedirect(true)
    } catch (error) {
      console.error(`Fetch didn't happen: ${error.message}`)
    }
  }
  
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const potentialErrors = validateInput(newQuest)
    if (Object.keys(potentialErrors).length === 0) {
      addNewQuest()
    }
  }
 
  const handleInputChange = (event) => {
    setNewQuest({
      ...newQuest,
      [event.currentTarget.name]: event.currentTarget.value
    })
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
            <FormError error={errors.name} />
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