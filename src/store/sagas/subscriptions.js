import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { getApi } from "../api";

function* loadSubscriptionList(action) {
    try {
        const api = getApi()
        let url = 'subscriptions/?';
        console.log(action)
        if(action.options && action.options.show_archived)
            url += '&show_archived=true';
        if(action.options && action.options.page)
            url += '&page='+ action.options.page;
        const response = yield call(api.get, url)
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
        const response = yield call(api.get, 'transactions/?subscription=' + action.id + '&page=' + action.page)
        yield put({ type: "LOAD_SUBSCRIPTION_TRANSACTIONS_SUCCEEDED", data: response.data })
    }
    catch (e) {
        console.log('Error loading subscription transactions', e)
    }
}

function* createSubscription(action) {
    try {
        console.log('create subscription', action)
        const api = getApi()
        const response = yield call(api.post, 'subscriptions/', action.data)
        yield put({ type: "CREATE_SUBSCRIPTION_SUCCEEDED", data: response.data })
        yield put(push('/subscriptions/'+response.data.id))
    }
    catch (e) {
        console.log('Error creating subscription', e)
    }
}

function* editSubscription(action) {
    try {
        const api = getApi()
        const response = yield call(api.put, 'subscriptions/'+action.id+'/', action.data)
        yield put({ type: "EDIT_SUBSCRIPTION_SUCCEEDED", data: response.data })
        yield put(push('/subscriptions/'+response.data.id))
    }
    catch(e) {
        console.log('Error editing subscription', e)
    }
}

function* pauseSubscription(action) {
    try {
        const api = getApi()
        const response = yield call(api.post, 'subscriptions/'+action.id+'/pause/', action.data)
        yield put({ type: "PAUSE_SUBSCRIPTION_SUCCEEDED", data: response.data })
        yield put({ type: "LOAD_SUBSCRIPTIONS", options: action.options })
    }
    catch(e) {
        console.log('Error pausing subscription', e)
    }
}

function* unpauseSubscription(action) {
    try {
        const api = getApi()
        const response = yield call(api.post, 'subscriptions/'+action.id+'/unpause/', action.data)
        yield put({ type: "UNPAUSE_SUBSCRIPTION_SUCCEEDED", data: response.data })
        yield put({ type: "LOAD_SUBSCRIPTIONS", options: action.options })
    }
    catch(e) {
        console.log('Error unpausing subscription', e)
    }
}

function* archiveSubscription(action) {
    try {
        const api = getApi()
        const response = yield call(api.post, 'subscriptions/'+action.id+'/archive/', action.data)
        yield put({ type: "ARCHIVE_SUBSCRIPTION_SUCCEEDED", data: response.data })
        yield put({ type: "LOAD_SUBSCRIPTION_DETAIL_SUCCEEDED", data: response.data })
        yield put(push('/subscriptions/'))
    }
    catch(e) {
        console.log('Error archiving subscription', e)
    }
}

function* unarchiveSubscription(action) {
    try {
        const api = getApi()
        const response = yield call(api.post, 'subscriptions/'+action.id+'/unarchive/', action.data)
        yield put({ type: "UNARCHIVE_SUBSCRIPTION_SUCCEEDED", data: response.data })
        yield put({ type: "LOAD_SUBSCRIPTION_DETAIL_SUCCEEDED", data: response.data })
        yield put(push('/subscriptions/'))
    }
    catch(e) {
        console.log('Error unarchiving subscription', e)
    }
}

function* getABI(action) {
    try {
        const api = getApi()
        const response = yield call(api.get, 'get_abi?address=' + action.address)
        yield put({ type: "GET_ABI_SUCCEEDED", data: response.data })
    }
    catch(e) {
        console.log('Error getting ABI', e)
    }
}

function* SubscriptionSaga() {
    yield takeLatest("LOAD_SUBSCRIPTIONS", loadSubscriptionList);
    yield takeLatest("LOAD_SUBSCRIPTION_DETAIL", loadSubscriptionDetail);
    yield takeLatest("LOAD_SUBSCRIPTION_TRANSACTIONS", loadSubscriptionTransactions);
    yield takeLatest("CREATE_SUBSCRIPTION", createSubscription);
    yield takeLatest("EDIT_SUBSCRIPTION", editSubscription);
    yield takeLatest("PAUSE_SUBSCRIPTION", pauseSubscription);
    yield takeLatest("UNPAUSE_SUBSCRIPTION", unpauseSubscription);
    yield takeLatest("ARCHIVE_SUBSCRIPTION", archiveSubscription);
    yield takeLatest("UNARCHIVE_SUBSCRIPTION", unarchiveSubscription);
    yield takeLatest("GET_ABI", getABI);
}

export default SubscriptionSaga;