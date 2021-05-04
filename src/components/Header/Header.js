import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogOut } from "../../store/actions";
import { selectLoggedInStatus, selectUserName } from "../../store/reducer";
import classes from "./Header.module.css";

export const Header = () => {
  const isLoggedIn = useSelector(selectLoggedInStatus);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();

  const logOut = (e) => {
    dispatch(userLogOut());
    e.preventDefault();
  };

  return (
    <header className={classes.topBar}>
      {isLoggedIn ? (
        <div>
          {userName},{" "}
          <Link to="/" onClick={logOut}>
            Log-out
          </Link>
        </div>
      ) : (
        <span>Welcome, stranger!</span>
      )}
    </header>
  );
};
