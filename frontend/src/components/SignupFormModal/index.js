import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const { closeModal } = useModal();
  const history = useHistory();

  useEffect(() => {
    setIsDisabled(!email.length || username.length < 4 || password.length < 6 || !firstName.length|| !lastName.length || !password.length || !confirmPassword.length)
  }, [email, username, firstName, lastName, password, confirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      history.push('/');
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const submitButton = "signup-submit-button" + (isDisabled ? ' disabled' : '')
  
  return (
    <div className="signup-modal">
      <h2 className="signup-heading">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {/* {console.log(errors)} */}
        <div className="errors">
        {errors.email && <p>{errors.email}</p>}
        {errors.username && <p>{errors.username}</p>}
        {errors.firstName && <p>{errors.firstName}</p>}
        {errors.lastName && <p>{errors.lastName}</p>}
        {errors.password && <p>{errors.password}</p>}
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        </div>
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="input-fields"
          />
        </label>
        {/* {errors.email && <p>{errors.email}</p>} */}
        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
            className="input-fields"
          />
        </label>
        {/* {errors.username && <p>{errors.username}</p>} */}
        <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
            className="input-fields"
          />
        </label>
        {/* {errors.firstName && <p>{errors.firstName}</p>} */}
        <label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
            className="input-fields"
          />
        </label>
        {/* {errors.lastName && <p>{errors.lastName}</p>} */}
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="input-fields"
          />
        </label>
        {/* {errors.password && <p>{errors.password}</p>} */}
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
            className="input-fields"
          />
        </label>
        {/* {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )} */}
        <button type="submit" className={submitButton} disabled={isDisabled} >Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;