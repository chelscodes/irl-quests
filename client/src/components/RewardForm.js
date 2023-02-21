import React, { useState } from "react"
import { AiFillCloseCircle } from "react-icons/ai";
import FormValidations from "../services/FormValidations";
import FormError from "./layout/FormError";
import addNewReward from "../services/apiClient/addNewReward"
import translateRewardMotivationLevel from "../services/translateRewardMotivationLevel";

const RewardForm = (props) => {
  const { rewards, setRewards, questId } = props
  const [newReward, setNewReward] = useState({
    name: "",
    motivationLevel: 1
  })

  const [errors, setErrors] = useState({})

  const clearForm = () => {
    setNewReward({
      name: "",
      motivationLevel: 1
    })
    setErrors({})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const potentialErrors = FormValidations.nameRequired(newReward)
    setErrors(potentialErrors)

    if (Object.keys(potentialErrors).length === 0) {
      const persistedReward = await addNewReward(newReward, questId)
      const newRewardsArray = [...rewards, persistedReward]
      setRewards(newRewardsArray)
      clearForm()
    }
  }

  const handleInput = (event) => {
    setNewReward({
      ...newReward,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const translatedMotivationLevel = translateRewardMotivationLevel(newReward.motivationLevel)

  return (
    <div className="form__section form__section--outline">
      <div className="close-icon" onClick={() => {props.setShowRewardForm(false)}}>
        <AiFillCloseCircle />
      </div>
      <h4 className="header">Add a New Reward</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input 
            type="text"
            name="name"
            placeholder="Write a reward name"
            value={newReward.name}
            onChange={handleInput}
          />
          <FormError error={errors.name} />
        </label>
        <label>
          Motivation Level: {translatedMotivationLevel}<br/>
          <input 
            type="range"
            name="motivationLevel"
            min="1"
            max="3"
            value={newReward.motivationLevel}
            onChange={handleInput}
          />
        </label>
        <input 
          type="submit" 
          className="button button__shadow button__shadow--blue" 
          value="Add Reward" 
        />
        <button 
          type="button"
          className="button button__shadow button__shadow--blue"
          onClick={clearForm}
        >Clear</button>
      </form>
    </div>
  )
}

export default RewardForm