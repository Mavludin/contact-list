import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { userLogIn } from "../../store/actions";
import classes from "./LoginPage.module.css";

export const LoginPage = () => {
  const dispatch = useDispatch();

  return (
    <div className={classes.loginPage}>
      <h1>Entry</h1>
      <Formik
        initialValues={{ login: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (values.login.length < 3) {
            errors.login = "Login not less than 3 characters";
          }
          if (values.password.length < 8) {
            errors.password = "Password not less than 8 characters";
          }
          return errors;
        }}
        onSubmit={(values) => {
          dispatch(userLogIn(values.login));
        }}
      >
        <Form className={classes.loginForm}>
          <div>
            <Field type="text" name="login" placeholder="Enter login" />
          </div>
          <div>
            <Field
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </div>
          <div>
            <button type="submit">Log-in</button>
            <div className={classes.errorBox}>
              <ErrorMessage
                name="login"
                component="div"
                className={classes.error}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={classes.error}
              />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
