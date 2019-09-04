import {
  call, put, takeLatest
} from 'redux-saga/effects'
import { getApi } from '../api'

function * loadDashboard () {
  try {
    const api = getApi()
    const response = yield call(api.get, 'dashboard')
    yield put({ type: 'LOAD_DASHBOARD_SUCCEEDED', data: response.data })
  } catch (e) {
    console.log('Error loading dashboard', e)
  }
}

function * dashboardSaga () {
  yield takeLatest('LOAD_DASHBOARD', loadDashboard)
}

export default dashboardSaga
