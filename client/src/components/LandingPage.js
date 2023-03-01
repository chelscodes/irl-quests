import React from "react";
import { Link } from "react-router-dom";

import exampleQuestShow from "../assets/images/exampleQuestShow.png"

const LandingPage = (props) => {

  return (
    <>
      <div className="landing__header grid-x grid-padding-x">
        <div className="cell small-12 medium-6 medium-offset-1 large-6 large-offset-1">
          <h2 className="landing__header-text header">Make your to-do list <br/> an adventure.</h2>
          <p className="landing__header-subtext">Welcome the ultimate task management app that adds a touch of fun and excitement to your daily routine! Whether it's cleaning your room, finishing a work project, or learning a new skill, you can transform your goals into a game-like experience that keeps you motivated and engaged.
          </p>
          <button className="button button__shadow landing__header-buttons">
            <Link to="/users/new">Sign Up</Link>
          </button>
          <button className="button button__shadow landing__header-buttons">
            <Link to="/user-summary">Start a Quest</Link>
          </button>
        </div>
        <div className="cell small-12 medium-5 large-5">
        </div>
      </div>
      <div className="landing__middle grid-x grid-padding-x">
        <div className="cell large-3 large-offset-2">
          <img src={exampleQuestShow} alt="example of a quest page" />
        </div>
        <div className="cell large-5 large-offset-1">
          <p>Creating a quest is easy! Sign up or log in, name your quest, and add tasks and corresponding rewards. <br/><br/>As you complete tasks, your points will accumulate, and you'll be able to unlock rewards that you've set for yourself. With real-time updates, you can track your progress, stay on top of your tasks, and earn rewards that will keep you motivated to complete even more. <br/><br/>Start your adventure today and turn your mundane tasks into epic accomplishments!</p>
        </div>
      </div>
    </>
  )
}

export default LandingPage