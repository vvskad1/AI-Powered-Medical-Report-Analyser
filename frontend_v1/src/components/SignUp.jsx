import React, { useState } from "react";

function SignUpForm({ onAuthSuccess }) {
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({ ...state, [evt.target.name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!state.name) newErrors.name = "Name is required";
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
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {errors.name && <span>{errors.name}</span>}
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span>{errors.email}</span>}
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <span>{errors.password}</span>}
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
