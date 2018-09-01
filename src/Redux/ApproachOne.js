import { takeLatest, takeEvery, select, call, put } from "redux-saga/effects";
import getUsers from "../API";


/**
 * Aproach 1 using high-level API's (Helper Effects) and simplyfied version of ApproachTwo.js
 */

// Root watcher saga //
// use them in parallel
export function* rootSaga() {
	yield takeLatest('GET_DATA_REQUEST', WorkerSaga);
	yield takeEvery("*", watchAndLog);
}

// worker logger saga //
function* watchAndLog(action) {
	const state = yield select();

	console.log("Action Dispatched", action);
	console.log("State After", state);
}



// worker saga //
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
