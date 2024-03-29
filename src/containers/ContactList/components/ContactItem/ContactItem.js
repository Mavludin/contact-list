import user from "../../../../assets/images/user.svg";
import deleteIcon from "../../../../assets/images/delete.svg";
import editIcon from "../../../../assets/images/edit.svg";
import smallLoader from "../../../../assets/images/small-loader.gif";
import classes from "../../ContactList.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectServerReady } from "../../../../store/reducer";
import PropTypes from 'prop-types';

export const ContactItem = ({ handlePopUpShow, currentData, setDialogShow, setSelectedItemPos }) => {
  const serverReady = useSelector(selectServerReady);
  const [listOpacity, setListOpacity] = useState("1");

  // Disabling the list visually depending on whether the server is ready or not
  useEffect(() => {
    if (!serverReady) setListOpacity("0.5");
    else setListOpacity("1");
  }, [serverReady]);

  // Prepare deleting
  const prepareDeleting = (pos) => {
    setDialogShow(true)
    setSelectedItemPos(pos)
  }

  return (
    <ul className={classes.contactList} style={{ opacity: listOpacity }}>
      {!serverReady && (
        <div className={classes.smallLoader}>
          <img src={smallLoader} alt="small loader" />
        </div>
      )}

      {currentData.map((item, pos) => {
        return (
          <li key={Number(item.id)} className={classes.item}>
            <div className={classes.left}>
              <img className={classes.avatar} src={user} alt="User avatar" />
              <span>{item.name}</span>
            </div>
            <div className={classes.right}>
              <button
                onClick={() => {
                  handlePopUpShow(item, pos);
                }}
              >
                <img src={editIcon} alt="Edit" />
              </button>
              <button
                onClick={() => prepareDeleting(pos)}
                disabled={serverReady ? false : true}
              >
                <img src={deleteIcon} alt="Trash can" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

ContactItem.propTypes = {
  handlePopUpShow: PropTypes.func.isRequired,
  currentData: PropTypes.array.isRequired,
  setDialogShow: PropTypes.func.isRequired,
  setSelectedItemPos: PropTypes.func.isRequired
}
