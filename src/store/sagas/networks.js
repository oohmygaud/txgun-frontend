import {
  call, put, takeLatest
} from 'redux-saga/effects'
import { getApi } from '../api'

function * loadNetworkList () {
  try {
    const api = getApi()
    const response = yield call(api.get, 'networks/')
    yield put({ type: 'LOAD_NETWORKS_SUCCEEDED', data: response.data })
  } catch (e) {
    console.log('Error loading network list', e)
  }
}

function * NetworkSaga () {
  yield takeLatest('LOAD_NETWORKS', loadNetworkList)
}

export default NetworkSaga
