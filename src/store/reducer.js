import { 
  PUT_DATA,
  EDIT_DATA,
  USER_LOGIN,
  USER_LOGOUT,
  DELETE_DATA,
  PUT_ADDED_DATA,
  ADD_DATA
} from "./actions"

let contactList = localStorage.getItem('contactList');
if (contactList) contactList = JSON.parse(contactList)
else contactList = []

const initialState = {
  userName: localStorage[("userName")] || '',
  loggedInStatus: localStorage[("isLogged")] === "true",
  data: contactList,
  showLoader: !localStorage[("isLogged")],
  showSmallLoader: false,
  serverReady: true
}

export const reducer = (state = initialState, action) => {

  switch (action.type) {
    case USER_LOGIN: {
      localStorage.setItem("isLogged", true)
      localStorage.setItem("userName", action.userName)
      return { ...state, userName: action.userName, loggedInStatus: true }
    }
    case USER_LOGOUT: {
      localStorage.setItem("isLogged", false)
      return { ...state, showLoader: true, loggedInStatus: false }
    }
    case PUT_DATA: {
      localStorage.setItem("contactList", JSON.stringify(action.data))
      return {
        ...state,
        data: action.data,
        showLoader: false
      }
    }
    case EDIT_DATA: {
      const editedData = state.data.map(item => {
        if (item.id === action.id) {
          item = action.newUpdate;
        }
        return {...item}
      })
      localStorage.setItem("contactList", JSON.stringify(editedData))
      return {
        ...state,
        data: editedData,
      }
    }
    case DELETE_DATA: {
        const dataAfterDelete = state.data.filter(item => item.id !== action.item.id);
        localStorage.setItem("contactList", JSON.stringify(dataAfterDelete))
        return {
          ...state,
          data: dataAfterDelete,
          serverReady: !state.serverReady
        }
    }
    case ADD_DATA: {
      return {
        ...state,
        serverReady: false
      }
    }
    case PUT_ADDED_DATA: {
      localStorage.setItem("contactList", JSON.stringify([...state.data, action.item]))
      return {
        ...state,
        data: [...state.data, action.item],
        serverReady: true
      }
    }
    default:
      return { ...state }
  }
}