import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let errorObj = {};

		//check if email contains an "@" symbol
		if (email.indexOf("@") === -1) {
			errorObj = {...errorObj, email: "Email must contain an @ symbol."};
		}

		if (password !== confirmPassword) {
			errorObj = {...errorObj, confirmPassword: "Confirm Password field must be the same as the Password field"};
		}

		//if there are validation errors, update the errors state and return early
		if (Object.keys(errorObj).length !== 0) {
			setErrors(errorObj);
			return;
		}

		const data = await dispatch(signUp(username, email, password));
		if (data) {
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
		<div className="signup-form-modal">
			<h1 className="modal-header">Sign Up</h1>
			<form className="signup-form-options" onSubmit={handleSubmit}>
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
				Username
				<input
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
				className="form-input-field"
				/>
				{errors.username && <div className="error-message">{errors.username}</div>}
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

			<label className="form-input-section">
				Confirm Password
				<input
				type="password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				required
				className="form-input-field"
				/>
				{errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
			</label>

			<button className="modal-submit-button" type="submit" disabled={email.length === 0 || username.length === 0 || password.length === 0 || confirmPassword.length === 0}>Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;