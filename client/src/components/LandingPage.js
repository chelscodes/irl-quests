import React from "react";
import { Link } from "react-router-dom";
import { GiJourney } from "react-icons/gi"

const LandingPage = (props) => {

  return (
    <>
      <div className="landing__header">
        <h2 className="landing__header-text header header--black">Stop dreading your task list. Begin your hero journey. <GiJourney /></h2>
        <Link to="/" className="button button--yellow">Get Started</Link>
      </div>
    </>
  )
}

export default LandingPage