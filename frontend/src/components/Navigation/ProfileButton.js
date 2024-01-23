import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import { Link, useHistory } from 'react-router-dom';
import UserSpots from "../UserSpots";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu} className="profileButtonNav">
        <i className="fas fa-user-circle" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="profile-dropdown-box">
            <div>Hello, {user.firstName}</div>
            {/* <div>{user.firstName} {user.lastName}</div> */}
            <div>{user.email}</div>
            <div className="manage-spots-container">
              <div className="line"></div>
              <Link to='/spots/current' className='manage-spots-link' onClick={()=> setShowMenu(false)} >Manage Spots</Link>
              <div className="line"></div>
              {/* <div className="line"></div> */}
              <Link to='/bookings/current' className='manage-spots-link' onClick={()=> setShowMenu(false)} >Manage Bookings</Link>
              <div className="line"></div>
            </div>
            <div className="logout-user-button-container">
              <button onClick={logout} className="logout-user-button">Log Out</button>
            </div>
          </div> 
        ) : (
          <div className="buttonDropDown">
            <div>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;