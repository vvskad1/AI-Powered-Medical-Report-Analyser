import React, { useState } from "react";

function SignInForm({ onAuthSuccess }) {
  const [state, setState] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({ ...state, [evt.target.name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!state.email.includes("@")) newErrors.email = "Invalid email address";
    if (state.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      onAuthSuccess(state);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
