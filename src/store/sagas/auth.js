import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from "axios";
import { getApi } from "../api";
import { push } from 'connected-react-router'


function* startLogin(action) {
    try {
        const api = getApi();
        const response = yield call(api.post,
            'api/token/',
            {
                username: action.username,
                password: action.password
            },
        )

        console.log(response);
        if (response.status == 200) {
            localStorage.setItem('authToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            localStorage.setItem('tokensCreated', new Date())
            yield put({ type: "LOGIN_SUCCEEDED", username: action.username });
            yield put({ type: "GET_PROFILE" })
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

        if (response.status == 200)
            yield put({ type: "LOGOUT_SUCCEEDED" });

    } catch (e) {
        console.log('Error logging out', e);
    }
    yield put(push('/login'))
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('tokensCreated')
}

function* getProfile(action) {
    try {
        const api = getApi();
        const response = yield call(api.get, 'accounts/profile/')
        console.log("You're already logged in as", response.data.username)
        yield put({ type: "GET_PROFILE_SUCCEEDED", user: response.data, username: response.data.username, user_id: response.data.id });

    }
    catch (e) {
        console.log('authtoken invalid, deleting')
        localStorage.removeItem('authToken')
    }
}

function* editProfile(action) {
    try {
        const api = getApi()
        const response = yield call(api.put, 'accounts/profile/', action.data)
        yield put({ type: "EDIT_PROFILE_SUCCEEDED", data: response.data })
        yield put(push('/home'))
        yield put({ type: 'GET_PROFILE' })

    }
    catch (e) {
        console.log('Error editing profile', e)
    }
}


function* doRefreshToken(action) {
    try {
        const api = getApi();
        const response = yield call(api.post, 'api/token/refresh/', {refresh: localStorage.getItem('refreshToken')})
        localStorage.setItem('authToken', response.data.access)
    }
    catch (e) {
        yield put({ type: "LOGOUT" })
        console.log('error refreshing token')
    }
}


function* register(action) {
    try {
        const api = getApi();
        const response = yield call(api.post, '/accounts/register/', 
            {
                username: action.username,
                email: action.email,
                password: action.password,
                password_confirm: action.password_confirm
            },
        )
        if (response.status == 201) {
            console.log('registration succeeded', response.data)
            yield put({ type: "REGISTRATION_SUCCEEDED", username: action.username, user_id: response.data.id });
            yield put({ type: "LOGOUT" })
            yield put(push('/login'))
        }
        else
            yield put({ type: "REGISTRATION_DENIED", errors: response.data });
    } catch(e) {
        console.log('Error registering new user', e.response.data)
        yield put({ type: "REGISTRATION_DENIED", errors: e.response.data });
    }
}




function* authSaga() {
    yield takeLatest("LOGIN", startLogin);
    yield takeLatest("LOGOUT", startLogout);
    yield takeLatest("GET_PROFILE", getProfile);
    yield takeLatest("DO_REFRESH_TOKEN", doRefreshToken);
    yield takeLatest("REGISTER", register);
    yield takeLatest("EDIT_PROFILE", editProfile);
}

export default authSaga;