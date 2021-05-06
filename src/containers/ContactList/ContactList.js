import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader/Loader";
import classes from "./ContactList.module.css";
import { addData, editData, fetchData } from "../../store/actions";
import { PopUp } from "./components/PopUp/PopUp";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { ContactItem } from "./components/ContactItem/ContactItem";
import { selectContactList, selectShowLoader } from "../../store/reducer";
import { useSearch } from "../../shared/hooks";
import { AlertDialog } from "./components/AlertDialog/AlertDialog";

export const ContactList = () => {
  const showLoader = useSelector(selectShowLoader);
  const contactList = useSelector(selectContactList);

  const dispatch = useDispatch();

  // Fetching data
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Attaching the state variables below to the input form fields
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  // Setting the necessary data when the Edit button is clicked
  // and preparing the form
  const [selectedItemPos, setSelectedItemPos] = useState(0);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpPurpose, setPopUpPurpose] = useState("");
  const handlePopUpShow = (item, pos) => {
    setIsPopUpVisible(true);
    setPopUpPurpose("edit");
    setInputName(item.name);
    setInputPhone(item.phone);
    setSelectedItemPos(pos);
  };

  // Handling the final 'Save' functionality
  const handleEdit = () => {
    const tempArr = [...contactList];
    tempArr[selectedItemPos].name = inputName;
    tempArr[selectedItemPos].phone = inputPhone;
    dispatch(editData(tempArr[selectedItemPos].id, tempArr[selectedItemPos]));
    setIsPopUpVisible(false);
  };

  // Setting the necessary data when the Add New button is clicked
  // and preparing the form
  const handleAddingPreparation = () => {
    setIsPopUpVisible(true);
    setPopUpPurpose("add");
    setInputName("");
    setInputPhone("");
  };

  // Handling the final 'Add' functionality
  const handleAdding = () => {
    const newItem = {
      name: inputName,
      phone: inputPhone,
    };
    dispatch(addData(newItem));
    setIsPopUpVisible(false);
  };

  // Manage dialog state
  const [dialogShow, setDialogShow] = useState(false);

  // Search hook
  const { isSearching, searchedData, handleSearch } = useSearch();

  let currentData = [];
  if (isSearching) currentData = searchedData;
  else currentData = contactList;

  return (
    <Loader visible={showLoader}>
      <div className={classes.contactListPage}>
        <h1>Contact list</h1>

        <div className={classes.addNew}>
          <button onClick={handleAddingPreparation} type="button">
            Add new contact
          </button>
        </div>

        <SearchForm handleSearch={handleSearch} />

        {contactList.length !== 0 && (
          <ContactItem
            setDialogShow={setDialogShow}
            handlePopUpShow={handlePopUpShow}
            currentData={currentData}
            setSelectedItemPos={setSelectedItemPos}
          />
        )}

        {isPopUpVisible && (
          <PopUp
            setIsPopUpVisible={setIsPopUpVisible}
            popUpPurpose={popUpPurpose}
            inputName={inputName}
            inputPhone={inputPhone}
            handleSave={handleEdit}
            handleAdding={handleAdding}
            setInputName={setInputName}
            setInputPhone={setInputPhone}
            handleEdit={handleEdit}
            isPopUpVisible={isPopUpVisible}
          />
        )}

        {dialogShow && (
          <AlertDialog
            dialogShow={dialogShow}
            setDialogShow={setDialogShow}
            selectedItemPos={selectedItemPos}
          />
        )}
      </div>
    </Loader>
  );
};
