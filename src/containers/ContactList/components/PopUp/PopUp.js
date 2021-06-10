import { ErrorMessage, Field, Form, Formik } from "formik";
import { Fragment, useEffect } from "react";
import PropTypes from 'prop-types';

import closeIcon from "../../../../assets/images/close.svg";

import classes from "./PopUp.module.css";

export const PopUp = ({
  setIsPopUpVisible,
  popUpPurpose,
  inputName,
  inputPhone,
  handleSave,
  handleAdding,
  setInputName,
  setInputPhone,
  handleEdit,
}) => {
  // Handling the Escape button click to close the form
  useEffect(() => {
    const handleCancel = (e) => {
      if (e.key === "Escape") setIsPopUpVisible(false);
    };
    window.addEventListener("keyup", handleCancel);
    return () => window.removeEventListener("keyup", handleCancel);
  }, [setIsPopUpVisible]);

  // Handling the Enter button click to submit the form
  useEffect(() => {
    const handleSubmit = (e) => {
      if (e.key === "Enter") {
        if (popUpPurpose === "add") handleAdding();
        else if (popUpPurpose === "edit") handleEdit();
      }
    };
    window.addEventListener("keyup", handleSubmit);
    return () => window.removeEventListener("keyup", handleSubmit);
  }, [handleAdding, popUpPurpose, handleEdit]);

  return (
    <Fragment>
      <div className={classes.overlay}></div>
      <Formik
        initialValues={{ name: inputName, phone: inputPhone }}
        validate={(values) => {
          const errors = {};
          if (!values.name.length || !values.phone.length) {
            errors.name = "Fields can't be empty";
          } else {
            setInputName(values.name);
            setInputPhone(values.phone);
          }
          return errors;
        }}
        onSubmit={() => {
          popUpPurpose === "edit" ? handleSave() : handleAdding();
        }}
      >
        <Form action="" className={classes.popUpForm}>
          <img
            src={closeIcon}
            alt="Close"
            onClick={() => setIsPopUpVisible(false)}
          />
          <div>
            <Field type="text" placeholder="Enter name" name="name" />
          </div>
          <div>
            <Field type="phone" placeholder="Enter phone number" name="phone" />
          </div>
          <div>
            {popUpPurpose === "edit" ? (
              <button type="submit">Save</button>
            ) : (
              <button type="submit">Add</button>
            )}
          </div>
          <div className={classes.errorBox}>
            <ErrorMessage
              name="name"
              component="div"
              className={classes.error}
            />
          </div>
        </Form>
      </Formik>
    </Fragment>
  );
};

PopUp.propTypes = {
  setIsPopUpVisible: PropTypes.func.isRequired,
  popUpPurpose: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputPhone: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleAdding: PropTypes.func.isRequired,
  setInputName: PropTypes.func.isRequired,
  setInputPhone:PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired
}
