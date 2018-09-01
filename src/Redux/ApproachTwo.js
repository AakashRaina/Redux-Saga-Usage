import { select, call, put, take, fork, all } from "redux-saga/effects";
import getUsers from "../API";

/**
 * Approach 2 using take and fork 
 */

/**
 * Root watcher saga, watching parallelly using all and forking multiple watchers at the same time.
 */
export function* rootSaga() {
  yield all([
    fork(watchGetDataRequest),
    fork(watchAllActions)
  ])
}

/**
 * Fork is used to create non-blocking tasks,
 * wherein we can do some other stuff while the task is getting executed
 */
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
// Call causes a blocking effect, just like apply //
function* WorkerSaga() {
  try {
    const response = yield call(getUsers);
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

