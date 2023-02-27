import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormValidations from "../../services/FormValidations";
import FormError from "../layout/FormError";

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ 
    email: "", 
    password: "" 
  })

  const [shouldRedirect, setShouldRedirect] = useState(false)

  const [errors, setErrors] = useState({})

  const onSubmit = async (event) => {
    event.preventDefault()
    setErrors({})
    const potentialErrors = FormValidations.signInForm(userPayload)
    setErrors(potentialErrors)

    if (Object.keys(potentialErrors).length === 0) {
      try {
          const response = await fetch("/api/v1/user-sessions", {
            method: "post",
            body: JSON.stringify(userPayload),
            headers: new Headers({
              "Content-Type": "application/json",
            })
          })
          if(!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`
            const error = new Error(errorMessage)
            throw(error)
          }
          const userData = await response.json()
          setShouldRedirect(true)

      } catch(err) {
        console.error(`Error in fetch: ${err.message}`)
        setErrors({noMatch: "Unable to sign in. Be sure to use the email and password you used to register."})
      }
    }
}

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/user-summary";
  }

  return (
    <div className="grid-container" onSubmit={onSubmit}>
      <h1 className="header text-center">Sign In</h1>
      <form className="form__section form__section--outline">
        <div>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <FormError error={errors.noMatch} />
        <div className="text-center">
          <input type="submit" className="button" value="Sign In" />
        </div>
        <p className="text-center"><Link to="/users/new">Don't have an account? Register</Link></p>
      </form>
    </div>
  );
};

export default SignInForm;