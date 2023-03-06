import React from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa"

const Footer = (props) => {

  return (
    <div className="footer">
      <ul className="menu simple align-center">
        <li>
          <a href="https://www.linkedin.com/in/chelsea-elizabeth-smith/" target="_blank">
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a href="https://github.com/chelscodes" target="_blank">
            <FaGithub />
          </a>
        </li>
        <li>
          Developed By Chelsea Smith
        </li>
      </ul>
    </div>
  )
}

export default Footer