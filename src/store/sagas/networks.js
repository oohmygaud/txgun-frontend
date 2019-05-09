import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { getApi } from "../api";

function* loadNetworkList(action) {
    try {
        const api = getApi()
        const response = yield call(api.get, 'networks/')
        yield put({ type: "LOAD_NETWORKS_SUCCEEDED", data: response.data })
    }
    catch (e) {
        console.log('Error loading network list', e)
    }
}


function* NetworkSaga() {
    yield takeLatest("LOAD_NETWORKS", loadNetworkList)
}

export default NetworkSaga;