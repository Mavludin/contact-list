import { 
  putData, 
  DELETE_DATA, 
  deleteData, 
  FETCH_DATA, 
  editData, 
  EDIT_DATA, 
  ADD_DATA,
  putAddedData, 
} from '../store/actions'
import { takeEvery, put, call, all, takeLeading } from 'redux-saga/effects'
import { dataSource } from '../utils/endpoints'
import axios from 'axios'

// Fetching data
function* workerLoadData() {
  try {
    const response = yield call(axios.get, dataSource)
    yield put(putData(response.data))
  } catch (e) {
    console.log(`😱 Fetch request failed: ${e}`);
  }
}

function* watchLoadData() {
  yield takeEvery(FETCH_DATA, workerLoadData)
}

// Deleting data
function* workerDeleteData(action) {
  try {
    const deletedData = yield call(axios.delete, `${dataSource}/${action.item.id}`, { data: action.item });
    yield put(deleteData(deletedData))
    console.log('👉 Success delete:', deletedData);
  } catch (e) {
    console.log(`😱 Delete request failed: ${e}`);
  }
}

function* watchDeleteData() {
  yield takeLeading(DELETE_DATA, workerDeleteData)
}

// Editing data
function* workerEditData({ id, newUpdate }) {
  try {
    const editedElement = yield call(axios.put, `${dataSource}/${id}`, newUpdate);
    yield put(editData(id, editedElement.data))
    console.log('👉 Success edit =>', editedElement.data)
  } catch (e) {
    console.log(`😱 Put request failed: ${e}`);
  }
}

function* watchEditData() {
  yield takeLeading(EDIT_DATA, workerEditData)
}

// Adding data
function* workerAddData({ item }) {
  try {
    const response = yield call(axios.post, dataSource, item);
    yield put(putAddedData(response.data))
    console.log('👉 Successfully added:', response.data);
  } catch (e) {
    console.log(`😱 Post request failed: ${e}`);
  }
}

function* watchAddData() {
  yield takeLeading(ADD_DATA, workerAddData)
}

export function* rootSaga() {
  yield all([
    watchLoadData(),
    watchDeleteData(),
    watchEditData(),
    watchAddData()
  ])
}