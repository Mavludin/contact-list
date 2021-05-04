import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { ContactList } from "../../containers/ContactList/ContactList";
import { LoginPage } from "../../containers/LoginPage/LoginPage";
import { selectLoggedInStatus } from "../../store/reducer";

export const Routes = () => {
  const isLoggedIn = useSelector(selectLoggedInStatus);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          isLoggedIn ? (
            <Redirect to="/contact-list" />
          ) : (
            <Redirect to="/login" />
          )
        }
      />

      <Route
        exact
        path="/login"
        render={(props) =>
          !isLoggedIn ? (
            <LoginPage {...props} />
          ) : (
            <Redirect to="/contact-list" />
          )
        }
      />

      <Route
        exact
        path="/contact-list"
        render={(props) =>
          isLoggedIn ? <ContactList {...props} /> : <Redirect to="/login" />
        }
      />
    </Switch>
  );
};
