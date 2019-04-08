import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from "axios";
import  { getApi } from "../api";

function* loadDashboard(action) {
    try {
        const api = getApi()
        const response = yield call(api.get, 'dashboard')
        yield put({ type: "LOAD_DASHBOARD_SUCCEEDED", data: response.data})
    }
    catch(e) {
        console.log('Error loading dashboard', e)
    }
}

function* dashboardSaga() {
    yield takeLatest("LOAD_DASHBOARD", loadDashboard);
}



export default dashboardSaga;