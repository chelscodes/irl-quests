import React from "react";
import getRewardPoints from "../services/getRewardPoints"

const RewardTile = (props) => {
  const { id, name, motivationLevel, used } = props.reward
  const handleToggle = props.handleToggle

  const points = getRewardPoints(motivationLevel)

  return (
    <div className="reward">
      <label>
        <input 
          id={id}
          type="checkbox"
          defaultChecked={used}
          onChange={() => handleToggle(id, used)}
        />
        {name}: {points}
      </label>
    </div>
  )
}

export default RewardTile