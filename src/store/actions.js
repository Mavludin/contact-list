export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const PUT_DATA = 'PUT_DATA'
export const FETCH_DATA = 'FETCH_DATA'
export const EDIT_DATA = 'EDIT_DATA'
export const DELETE_DATA = 'DELETE_DATA'
export const ADD_DATA = 'ADD_DATA'
export const PUT_ADDED_DATA = 'PUT_ADDED_DATA'

export const userLogIn = (userName) => {
  return {
    type: USER_LOGIN,
    userName
  }
}

export const userLogOut = () => {
  return {
    type: USER_LOGOUT
  }
}

export const fetchData = () => {
  return {
    type: FETCH_DATA
  }
}

export const putData = (data) => {
  return {
    type: PUT_DATA,
    data
  }
}

export const editData = (id, newUpdate) => {
  return {
    type: EDIT_DATA,
    id,
    newUpdate
  }
}

export const deleteData = (item) => {
  return {
    type: DELETE_DATA,
    item
  }
}

export const addData = (item) => {
  return {
    type: ADD_DATA,
    item
  }
}

export const putAddedData = (item) => {
  return {
    type: PUT_ADDED_DATA,
    item
  }
}