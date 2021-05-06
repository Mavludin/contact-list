### What is the project about

1) It is a web app on React JS that consists of 2 pages: Login and Contact List;
2) In order to get access to the list of contacts, you must login;
3) HTTP requests are handled on the Contact List page;
4) All the CRUD actions are handled through HTTP requests and directly reflect on the API server;
5) The server is just a bunch of mock data and created on https://mockapi.io/.

### Login page

1) If you are not logged in, you get redirected to the Login page
2) It is necessary to enter user name and password: user name - not less than 3 symbols, password - not less than 8 symbols.
3) Once you are logged in, you will be taken to the Contact List page.

### Other stuff
1) The global state is handled by Redux
2) The CRUD asynchronous actions are managed by Redux Saga
3) Formik is used to work with forms

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.