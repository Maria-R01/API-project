import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) { 
          setErrors(data.errors);
        }
      });
  };

  useEffect(() => {
    setIsDisabled(credential.length < 4 || password.length < 6 )
  }, [credential, password])

  const submitButton = "signup-submit-button" + (isDisabled ? ' disabled' : '')

  const loginDemoUser = async () => {
    // const user = {
    //   credential: 'DemoUserLogin',
    //   password: 'demoUser',
    // };
    const user = {
      credential: 'demo@user.io',
      password: 'password',
    };
    return await dispatch(sessionActions.login(user))
      .then(closeModal)
      .then(history.push('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  }

  return (
    <div className="modal">
      <h1 className="form-title">Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        {errors.credential && (
            <p className="errors">{errors.credential}</p>
          )}
        <label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required 
            placeholder="Username or Email"
            className="login-input-fields"
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder="Password"
            className="login-input-fields"
          />
        </label>
        <button type="submit" disabled={isDisabled} className={submitButton}>Log In</button>
      </form>
      <div className="demo-user">
        <button onClick={loginDemoUser} className='demo-user-button' >Demo User</button>
      </div>
    </div>
  );
}

export default LoginFormModal;