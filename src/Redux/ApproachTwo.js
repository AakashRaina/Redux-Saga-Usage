import { select, call, put, take, fork, all } from "redux-saga/effects";
import getUsersFromApi from "../API";

/**
 * Approach 2 using take and fork 
 */

export function* rootSaga() {
  yield all([
    fork(watchGetDataRequest),
    fork(watchAllActions)
  ])
}

function* watchGetDataRequest() {
  while (true) {
    yield take('GET_DATA_REQUEST');
    yield fork(WorkerSaga);
  }
}

function* watchAllActions() {
  while (true) {
    const action = yield take("*");
    yield fork(loggerGenerator, action);
  }
}

// worker logger saga //
function* loggerGenerator(action) {
  const state = yield select();

  console.log("Action Dispatched", action);
  console.log("State After", state);
}

// worker saga //
function* WorkerSaga() {
  try {
    const response = yield call(getUsersFromApi);
    const usersArray = response.data;
    yield put({
      type: 'GET_DATA_SUCCESS',
      data: usersArray
    })
  } catch (error) {
    yield put({
      type: 'GET_DATA_FAILURE',
      error: error
    })
  }
}

