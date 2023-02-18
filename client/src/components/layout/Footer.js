import React from "react"
import { Link } from "react-router-dom"

const Footer = (props) => {

  return (
    <div className="footer">
      <ul className="menu simple align-center">
        <li>Footer</li>
        <li>
          <Link to="/">About the Developer</Link>
        </li>
      </ul>
    </div>
  )
}

export default Footer