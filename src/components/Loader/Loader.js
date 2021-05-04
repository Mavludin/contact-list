import loader from "../../assets/images/preloader.gif";

import classes from "./Loader.module.css";

export const Loader = ({ visible, children }) => {
  return (
    <div>
      {visible ? (
        <img className={classes.loader} src={loader} alt="Loader" />
      ) : (
        children
      )}
    </div>
  );
};
