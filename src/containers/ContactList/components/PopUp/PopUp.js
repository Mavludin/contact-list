import { ErrorMessage, Field, Form, Formik } from "formik";
import { Fragment } from "react";

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
}) => {
  return (
    <Fragment>
      <div className={classes.Overlay}></div>
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
        <Form action="" className={classes.PopUpForm}>
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
          <div className={classes.ErrorBox}>
            <ErrorMessage
              name="name"
              component="div"
              className={classes.Error}
            />
          </div>
        </Form>
      </Formik>
    </Fragment>
  );
};
