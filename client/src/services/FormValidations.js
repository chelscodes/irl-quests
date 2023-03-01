import config from "../config";

class FormValidations {
  
  static registrationForm(formInput) {
    const { email, username, password, passwordConfirmation } = formInput;
    const emailRegexp = config.validation.email.regexp.emailRegex;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }
    
    if (username.trim() === "") {
      newErrors = {
        ...newErrors,
        username: "is required",
      };
    }
    
    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }
    
    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }
    
    return newErrors
  }

  static signInForm(formInput) {
    const { email, password } = formInput;
    const emailRegexp = config.validation.email.regexp.emailRegex;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }
    
    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }
    return newErrors
  }

  static nameRequired(formInput) {
    const { name } = formInput
    let newErrors = {}
    if (name.trim() === "") {
      newErrors = {
        ...newErrors,
        name: "is required"
      }
    }
    return newErrors
  }
}

export default FormValidations