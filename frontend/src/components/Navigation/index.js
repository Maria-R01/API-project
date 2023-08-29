import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
    <div className='navBar'>
      <div>
        <NavLink exact to="/" className='icon-div-container'>
        <img src='https://img.icons8.com/?size=512&id=EDet7mLkQ6HQ&format=png' alt='FauxBnB' className='fauxbnbIcon'></img>
        FauxBnB
        </NavLink>
      </div>
      {isLoaded && (
        <div className='profile-icon'>
          <ProfileButton user={sessionUser} className='profile-button' />
        </div>
      )}
    </div>
    <div className='bottomLine'></div>
    </>
  );
}

export default Navigation;