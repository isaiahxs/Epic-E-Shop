import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  console.log("errors", errors)
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      const errorObj = {};
      data.forEach(err => {
        const [field, message] = err.split(" : ");
        errorObj[field] = message;
      });
      setErrors(errorObj);
    } else {
      closeModal();
    }
  };

  return (
    <div className="login-form-modal">
      <h1 className="modal-header">Log In</h1>
      <form className="login-form-options" onSubmit={handleSubmit}>

        <label className="form-input-section">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input-field"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </label>

        <label className="form-input-section">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input-field"
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </label>

        <button className="modal-submit-button" type="submit" disabled={email.length === 0 || password.length === 0}>Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
