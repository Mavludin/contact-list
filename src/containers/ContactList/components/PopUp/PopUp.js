import React from 'react';

import closeIcon from '../../../../assets/images/close.svg';

import classes from './PopUp.module.css';

export const PopUp = ({ 
  setIsPopUpVisible,
  popUpPurpose,
  inputName,
  inputPhone,
  handleNameChange,
  handlePhoneChange,
  handleSave,
  handleAdding
 }) => {

  return (
    <React.Fragment>

    <div className={classes.Overlay}></div>

    <form action="" className={classes.PopUpForm}>
      <img src={closeIcon} alt="Close" onClick={()=>setIsPopUpVisible(false)} />
      <div>
        <input type="text" value={inputName} onChange={handleNameChange} placeholder="Enter name" />
      </div>
      <div>
        <input type="phone" value={inputPhone} onChange={handlePhoneChange} placeholder="Enter phone number" />
      </div>
      <div>
        {
          popUpPurpose === 'edit'
          ? <button onClick={handleSave} type="button">Save</button>
          : <button onClick={handleAdding} type="button">Add</button>
        }
      </div>
    </form>

  </React.Fragment>
  );
}
