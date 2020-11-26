import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogOut } from '../../store/actions';
import classes from './Header.module.css'

export const Header = () => {

  const isLoggedIn = useSelector(state => state.loggedInStatus);
  const userName = useSelector(state => state.userName);
  const dispatch = useDispatch();

  const logOut = (e) => {
    dispatch(userLogOut());
    e.preventDefault();
  }

  return (
    <header className={classes.TopBar}>
      {
        isLoggedIn
        ?
        <div>
          {userName}, <Link to="/" onClick={logOut}>Log-out</Link>
        </div>
        :
        <span>Welcome, stranger!</span>
      }

    </header>
  );
}
