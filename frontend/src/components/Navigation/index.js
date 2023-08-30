import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  // console.log('session User: ', sessionUser)

  const hideCreateSpot = (sessionUser ? 'create-spot-link' : 'hidden')

  return (
    <>
    <div className='navBar'>
      <div>
        <NavLink exact to="/" className='icon-div-container'>
        <img src='https://img.icons8.com/?size=512&id=EDet7mLkQ6HQ&format=png' alt='FauxBnB' className='fauxbnbIcon'></img>
        FauxBnB
        </NavLink>
      </div>
      {/* {sessionUser && (
        <div className='create-spot-container'>
          <div>
          <NavLink to='/spots/new'>Create a New Spot</NavLink>
          </div>
        </div>
      )} */}
      {isLoaded && (
        <>
        <div className='profile-icon'>
        <div className='create-spot-container'>
          <NavLink to='/spots/new' className={hideCreateSpot}>Create a New Spot</NavLink>
        </div>  
        <div>
          <ProfileButton user={sessionUser} className='profile-button' />
        </div>   
        </div>
        </>
      )}
    </div>
    <div className='bottomLine'></div>
    </>
  );
}

export default Navigation;