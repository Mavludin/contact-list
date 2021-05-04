import {
  PUT_DATA,
  EDIT_DATA,
  DELETE_DATA,
  ADD_DATA,
  USER_LOGIN,
  USER_LOGOUT,
} from "./actions";

const initialState = {
  contactList: [],
  showLoader: true,
  showSmallLoader: false,
  serverReady: true,
  userName: localStorage["userName"] || "",
  loggedInStatus: localStorage["isLogged"] === "true",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      localStorage.setItem("isLogged", true);
      localStorage.setItem("userName", action.userName);
      return { ...state, userName: action.userName, loggedInStatus: true };
    }
    case USER_LOGOUT: {
      localStorage.setItem("isLogged", false);
      return { ...state, showLoader: true, loggedInStatus: false };
    }
    case PUT_DATA: {
      return {
        ...state,
        contactList: action.contactList,
        showLoader: false,
        serverReady: true
      };
    }
    case EDIT_DATA: {
      const editedData = state.contactList.map((item) => {
        if (item.id === action.id) {
          item = action.newUpdate;
        }
        return { ...item };
      });
      return {
        ...state,
        contactList: editedData,
        serverReady: !state.serverReady,
      };
    }
    case DELETE_DATA: {
      const dataAfterDelete = state.contactList.filter(
        (item) => item.id !== action.item.id
      );
      return {
        ...state,
        contactList: dataAfterDelete,
        serverReady: !state.serverReady,
      };
    }
    case ADD_DATA: {
      return {
        ...state,
        serverReady: !state.serverReady,
      };
    }
    default:
      return { ...state };
  }
};

export const selectContactList = state => state.contactList
export const selectShowLoader = state => state.showLoader
export const selectShowSmallLoader = state => state.showSmallLoader
export const selectServerReady = state => state.serverReady
export const selectUserName = state => state.userName
export const selectLoggedInStatus = state => state.loggedInStatus
