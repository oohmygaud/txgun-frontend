import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { getApi } from "../api";

function* loadAPIKeyList(action) {
    try {
        const api = getApi()
        let url = 'api_keys/?';
        if(action.page)
            url += '&page='+ action.page;
        const response = yield call(api.get, url)
        yield put({ type: "LOAD_API_KEYS_SUCCEEDED", data: response.data })
    }
    catch (e) {
        console.log('Error loading api keys', e)
    }
}

function* createAPIKey(action) {
    try {
        const api = getApi()
        const response = yield call(api.post, 'api_keys/', action.data)
        yield put({ type: "CREATE_API_KEY_SUCCEEDED", data: response.data })
        yield put(push('/api_keys/'+response.data.id))
    }
    catch (e) {
        console.log('Error creating api keys', e)
    }
}

function* loadAPIKeyDetail(action) {
    try {
        const api = getApi()
        const response = yield call(api.get, 'api_keys/' + action.id)
        yield put({ type: "LOAD_API_KEY_DETAIL_SUCCEEDED", data: response.data })
    }
    catch (e) {
        console.log('Error loading api key detail', e)
    }
}
function* APIKeySaga() {
    yield takeLatest("LOAD_API_KEYS", loadAPIKeyList);
    yield takeLatest("CREATE_API_KEY", createAPIKey);
    yield takeLatest("LOAD_API_KEY_DETAIL", loadAPIKeyDetail);
}

export default APIKeySaga;