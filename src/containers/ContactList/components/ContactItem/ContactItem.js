import user from "../../../../assets/images/user.svg";
import deleteIcon from "../../../../assets/images/delete.svg";
import editIcon from "../../../../assets/images/edit.svg";
import smallLoader from "../../../../assets/images/small-loader.gif";
import classes from "../../ContactList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteData } from "../../../../store/actions";
import { selectServerReady } from "../../../../store/reducer";

export const ContactItem = ({ handlePopUpShow, currentData }) => {
  const serverReady = useSelector(selectServerReady);
  const [listOpacity, setListOpacity] = useState("1");

  // Disabling the list visually depending on whether the server is ready or not
  useEffect(() => {
    if (!serverReady) setListOpacity("0.5");
    else setListOpacity("1");
  }, [serverReady]);

  const dispatch = useDispatch();

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
                onClick={() => dispatch(deleteData(item))}
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
