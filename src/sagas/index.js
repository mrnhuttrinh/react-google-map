import { takeLatest, put, fork, all } from 'redux-saga/effects';
import * as actions from '../actions';

export function* executeGetData() {
  try {
    const data = require('./data.json');
    yield put(actions.getDataStart());
    yield put(actions.getDataSuccesed(data));
  } catch (error) {
    yield put(actions.getDataFailed(error));
  }
}

export function* watchFetchData() {
  yield takeLatest(actions.GET_DATA, executeGetData)
}

export default function* root() {
  yield all([fork(watchFetchData)]);
}
