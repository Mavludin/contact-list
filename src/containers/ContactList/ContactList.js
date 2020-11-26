import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Preloader } from '../../components/Preloader/Preloader';
import user from '../../assets/images/user.svg';
import deleteIcon from '../../assets/images/delete.svg';
import editIcon from '../../assets/images/edit.svg';
import smallLoader from '../../assets/images/small-loader.gif';
import classes from './ContactList.module.css';
import { addData, deleteData, editData } from '../../store/actions';
import { PopUp } from './components/PopUp/PopUp';
import { SearchForm } from './components/SearchForm/SearchForm';

export const ContactList = () => {

  const showLoader = useSelector(state => state.showLoader);
  const contactList = useSelector(state => state.data);

  const dispatch = useDispatch();

  // Attaching the state variables below to the input form fields
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const handleNameChange = (e) => {
    setInputName(e.target.value)
  }
  const handlePhoneChange = (e) => {
    setInputPhone(e.target.value)
  }

  // Setting the necessary data when the Edit button is clicked
  // and preparing the form
  const [selectedItemPos, setSelectedItemPos] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState(1);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpPurpose, setPopUpPurpose] = useState('');
  const handlePopUpShow = (item, pos) => {
    setIsPopUpVisible(true);
    setPopUpPurpose('edit');
    setInputName(item.name);
    setInputPhone(item.phone);
    setSelectedItemPos(pos);
    setSelectedItemId(item.id)
  }

  // Handling the final 'Save' functionality
  const handleEdit = () => {
    const tempApp = [...contactList];
    tempApp[selectedItemPos].name = inputName;
    tempApp[selectedItemPos].phone = inputPhone;
    dispatch(editData(selectedItemId, tempApp[selectedItemPos]));
    setIsPopUpVisible(false)
  }

  // Setting the necessary data when the Add New button is clicked
  // and preparing the form
  const handleAddingPreparation = () => {
    setIsPopUpVisible(true);
    setPopUpPurpose('add');
    setInputName('');
    setInputPhone('')
  }

  // Handling the final 'Add' functionality
  const handleAdding = () => {
    const newItem = {
      'name': inputName,
      'phone': inputPhone
    }
    dispatch(addData(newItem))
    setIsPopUpVisible(false)
  }

  // Handling delete
  const handleDelete = (item) => {
    dispatch(deleteData(item))
  }

  // Search function
  const handleSearch = (string) => {

    if (string.length) {
      const tempArray = contactList.filter(item => {
        for (let key in item) {
          if (item[key].toString().toLowerCase().includes(string.toLowerCase())) {
            return item;
          }
        }
        return false
      });

      setSearchedData(tempArray)
      setIsSearching(true);

    } else setIsSearching(false)

  }

  // Setting a flag and a new array for the searched data
  const [isSearching, setIsSearching] = useState(false);
  const [searchedData, setSearchedData] = useState([]);

  let currentData = [];
  if (isSearching) currentData = searchedData;
  else currentData = contactList

  const serverReady = useSelector(state => state.serverReady);
  const [listOpacity, setListOpacity] = useState('1')

  // Disabling the list visually depending on whether the server is ready or not
  useEffect(() => {
    if (!serverReady) setListOpacity('0.5')
    else setListOpacity('1')
  }, [serverReady])

  // Handling the Escape button click to close the form
  useEffect(() => {
    const handleCancel = (e) => {
      if (isPopUpVisible && e.key === 'Escape') setIsPopUpVisible(false)
    }
    window.addEventListener('keyup', handleCancel)
    return () => window.removeEventListener('keyup', handleCancel)
  }, [isPopUpVisible, contactList, inputName, dispatch])

  // Handling the Enter button click to submit the form
  useEffect(() => {
    const handleSubmit = (e) => {
      if (isPopUpVisible && e.key === 'Enter') {
        if (popUpPurpose === 'add') handleAdding()
        else if (popUpPurpose === 'edit') handleEdit()
      }
    }
    window.addEventListener('keyup', handleSubmit)
    return () => window.removeEventListener('keyup', handleSubmit)
  })

  return (
    <Preloader visible={showLoader}>
      <div className={classes.ContactListPage}>
        <h1>Contact list</h1>

        <div className={classes.AddNew}>
          <button onClick={handleAddingPreparation} type="button">Add new contact</button>
        </div>

        <SearchForm handleSearch={handleSearch} />

        <ul className={classes.ContactList} style={{ opacity: listOpacity }}>
          {
            currentData.map((item, pos) => {
              return (
                <li key={Number(item.id)} className={classes.Item}>
                  <div className={classes.Left}>
                    <img className={classes.Avatar} src={user} alt="User avatar" />
                    <span>{item.name}</span>
                  </div>
                  <div className={classes.Right}>
                    <button onClick={() => { handlePopUpShow(item, pos) }}>
                      <img src={editIcon} alt="Edit" />
                    </button>
                    <button onClick={() => handleDelete(item)} disabled={true ? !serverReady : false}>
                      <img src={deleteIcon} alt="Trash can" />
                    </button>
                  </div>
                </li>
              )
            })
          }
        </ul>

        {
          !serverReady
            ?
            <div className={classes.SmallLoader}>
              <img src={smallLoader} alt="small loader" />
            </div>
            : null
        }

        {
          isPopUpVisible
            ?
            <PopUp
              setIsPopUpVisible={setIsPopUpVisible}
              popUpPurpose={popUpPurpose}
              inputName={inputName}
              inputPhone={inputPhone}
              handleNameChange={handleNameChange}
              handlePhoneChange={handlePhoneChange}
              handleSave={handleEdit}
              handleAdding={handleAdding}
            />
            :
            null
        }

      </div>
    </Preloader>
  );
}
