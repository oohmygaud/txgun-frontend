import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from "axios";
import getApi from "../api";

function* startLogin(action) {
    try {
        const response = yield call(axios.post,
            'http://localhost:8000/api/token/',
            {
                username: action.username,
                password: action.password
            },
        )

        console.log(response);
        if(response.status == 200)
        {
            localStorage.setItem('authToken', response.data.access)
            yield put({ type: "LOGIN_SUCCEEDED", username: action.username });
        }
        else
            yield put({ type: "LOGIN_DENIED" });

        // this.props.history.push('/home');

    } catch (e) {
        console.log('Error logging in', e);
        yield put({ type: "LOGIN_DENIED" });
    }
    
}

function* startLogout(action) {
    try {
        const api = getApi();
        const response = yield call(api.post,
            'accounts/logout/')

        if(response.status == 200)
            yield put({type: "LOGOUT_SUCCEEDED" });

    } catch (e) {
        console.log('Error logging out', e);
    }
    localStorage.removeItem('authToken')
}

function* getProfile(action) {
    try {
        const api = getApi();
        const response = yield call(api.get, 'accounts/profile')
        console.log("you're already logged in", response)
        yield put({ type: "GET_PROFILE_SUCCEEDED", username: response.data.username});

    }
    catch(e) {
        console.log('authtoken invalid, deleting')
        localStorage.removeItem('authToken')
    }
}

function* authSaga() {
    yield takeLatest("LOGIN", startLogin);
    yield takeLatest("LOGOUT", startLogout);
    yield takeLatest("GET_PROFILE", getProfile);
}

export default authSaga;