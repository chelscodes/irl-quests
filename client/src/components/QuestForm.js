import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import FormError from "./layout/FormError"
import FormValidations from "../services/FormValidations"
import addNewQuest from "../services/apiClient/addNewQuest"

let newQuestId = null

const QuestForm = (props) => {
  const [newQuest, setNewQuest] = useState({
    name: "",
    description: ""
  })

  const [errors, setErrors] = useState({})

  const [shouldRedirect, setShouldRedirect] = useState(false)
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    
    setErrors({})
    const potentialErrors = FormValidations.questForm(newQuest)
    setErrors(potentialErrors)

    if (Object.keys(potentialErrors).length === 0) {
      newQuestId = await addNewQuest(newQuest, newQuestId)
      if (newQuestId) {
        setShouldRedirect(true)
      }
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