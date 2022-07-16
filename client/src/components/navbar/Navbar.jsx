import React from 'react';
import './Navbar.css';
import logo from '../../assets/img/Logo.png';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';

export default function Navbar() {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className="container">
          <img src={logo} className="navbar_logo" alt="navbar_logo"/>
            <div className="navbar_header">MERN CLOUD</div>
            {!isAuth && <div className="navbar_login"><NavLink to='/login'>Sign In</NavLink></div>}
            {!isAuth && <div className="navbar_reg"><NavLink to='/reg'>Sign Up</NavLink></div>}
            {isAuth && <div className="navbar_login" onClick={() => dispatch(logout()) }>Exit</div>}
      </div>
    </div>
  )
}
