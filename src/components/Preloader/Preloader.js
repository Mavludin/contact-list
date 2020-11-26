import React from 'react';
import preloader from '../../assets/images/preloader.gif';

import classes from './Preloader.module.css';

export const Preloader = ({ visible, children }) => {

  return (
    <div>
      {
        visible 
        ? <img className={classes.Preloader} src={preloader} alt="Preloader" />
        : children
      }
    </div>
  );
}
