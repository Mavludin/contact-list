import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { ContactList } from './containers/ContactList/ContactList';
import { LoginPage } from './containers/LoginPage/LoginPage';

export const App = () => {

  const isLoggedIn = useSelector(state => state.loggedInStatus);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Switch>

            <Route exact path="/" render={() => (
              isLoggedIn
                ?
                <Redirect to="/contact-list" />
                :
                <Redirect to="/login" />
            )} />

            <Route exact path="/login" render={(props) => (
              !isLoggedIn
                ?
                <LoginPage {...props} />
                :
                <Redirect to="/contact-list" />
            )} />

            <Route exact path="/contact-list" render={(props) => (
              isLoggedIn ?
                <ContactList {...props} />
                :
                <Redirect to="/login" />
            )} />

          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}
