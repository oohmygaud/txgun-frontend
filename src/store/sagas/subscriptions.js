import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from "axios";
import getApi from "../api";

function* loadSubscriptionList(action) {
    try {
        const api = getApi()
        const response = yield call(api.get, 'subscriptions')
        yield put({ type: "LOAD_SUBSCRIPTIONS_SUCCEEDED", data: response.data })
    }
    catch (e) {
        console.log('Error loading subscriptions', e)
    }
}

function* loadSubscriptionDetail(action) {
    try {
        const api = getApi()
        const response = yield call(api.get, 'subscriptions/' + action.id)
        yield put({ type: "LOAD_SUBSCRIPTION_DETAIL_SUCCEEDED", data: response.data })
    }
    catch (e) {
        console.log('Error loading subscription detail', e)
    }
}

function* loadSubscriptionTransactions(action) {
    try {
        const api = getApi()
        const response = yield call(api.get, 'transactions/?subscription=' + action.id)
        yield put({ type: "LOAD_SUBSCRIPTION_TRANSACTIONS_SUCCEEDED", data: response.data })
    }
    catch (e) {
        console.log('Error loading subscription transactions', e)
    }
}

function* SubscriptionSaga() {
    yield takeLatest("LOAD_SUBSCRIPTIONS", loadSubscriptionList);
    yield takeLatest("LOAD_SUBSCRIPTION_DETAIL", loadSubscriptionDetail);
    yield takeLatest("LOAD_SUBSCRIPTION_TRANSACTIONS", loadSubscriptionTransactions);
}

export default SubscriptionSaga;