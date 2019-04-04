import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import getApi from "../api";

function* loadAPICredits(action) {
    try {
        const api = getApi()
        const response = yield call(api.get, 'api_credits')
        yield put({ type: "LOAD_API_CREDITS_SUCCEEDED", data: response.data })
    }
    catch (e) {
        console.log('Error loading api credits', e)
    }
}

function* loadCreditBalance(action) {
    try {
        const api = getApi()
        const response = yield call(api.get, 'api_balance')
        yield put({ type: "LOAD_CREDIT_BALANCE_SUCCEEDED",
                    data: response.data.api_credit_balance.amount__sum })
    }
    catch (e) {
        console.log('Error loading api credit balance', e)
    }
}

function* APICreditSaga() {
    yield takeLatest("LOAD_API_CREDITS", loadAPICredits);
    yield takeLatest("LOAD_CREDIT_BALANCE", loadCreditBalance)

}

export default APICreditSaga;