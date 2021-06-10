import loader from "../../assets/images/preloader.gif";
import PropTypes from 'prop-types';
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


Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
}