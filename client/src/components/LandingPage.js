import React from "react";
import { Link } from "react-router-dom";

const LandingPage = (props) => {

  return (
    <>
      <div className="landing__header grid-x grid-padding-x">
        <div className="cell medium-1 large-1"/>
        <div className="cell small-12 medium-6 large-6">
          <h2 className="landing__header-text header">earn rewards<br/> for life quests</h2>
          <p className="landing__header-subtext">Welcome to irlQuests, the ultimate productivity app that turns your to-do list into an epic quest. Whether you want to tackle a new project, build a new habit, or simply get more done in less time, irlQuests app is the perfect tool to help you stay motivated and on track.
          <br/><br/>
          So what are you waiting for? Start your quest today and unlock your full potential with irlQuests.</p>
          <button className="button button__shadow landing__header-buttons">
            <Link to="/user-sessions/new">Sign In</Link>
          </button>
          <button className="button button__shadow landing__header-buttons">
            <Link to="/users/new">Get Started</Link>
          </button>
        </div>
        <div className="cell small-12 medium-5 large-5">
        </div>
      </div>
      <div className="landing__middle" />
    </>
  )
}

export default LandingPage