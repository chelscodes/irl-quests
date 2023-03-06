import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { AiFillCloseCircle } from "react-icons/ai";
import FormError from "../layout/FormError"
import FormValidations from "../../services/FormValidations"
import addNewQuest from "../../services/apiClient/addNewQuest"

let newQuestId = null

const QuestForm = (props) => {
  const [newQuest, setNewQuest] = useState({
    name: "",
    description: ""
  })

  const [errors, setErrors] = useState({})

  const [shouldRedirect, setShouldRedirect] = useState(false)

  const clearForm = () => {
    setNewQuest({
      name: "",
      description: ""
    })
    setErrors({})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrors({})
    const potentialErrors = FormValidations.nameRequired(newQuest)
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
    <div className="form__section form__section--outline form__section--quest">
      <div className="close-icon" onClick={() => {props.setShowQuestForm(false)}}>
        <AiFillCloseCircle />
      </div>
      <h4 className="header text-center">Create a New Quest</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" value={newQuest.name} onChange={handleInputChange} />
          <FormError error={errors.name} />
        </label>
        <label>
          Description
          <input type="text" name="description" value={newQuest.description} onChange={handleInputChange} />
        </label>
        <input 
          type="submit" 
          className="button button__shadow button__shadow--blue" 
          value="Begin Your Quest" 
        />
        <button 
          type="button"
          className="button__delete"
          onClick={clearForm}
        >Clear</button>
      </form>
    </div>
  )
}

export default QuestForm