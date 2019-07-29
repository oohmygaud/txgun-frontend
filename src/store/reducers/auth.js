export default (state = {}, action) => {
    switch (action.type) {

        case 'LOGOUT': return {};

        case 'LOGIN_SUCCEEDED':
            console.log('Login success, welcome', action.username);
            return { ...state, username: action.username };

        case 'LOGIN_DENIED':
            return { ...state, loginError: true };

        case 'LOGOUT_SUCCEEDED':
            console.log('Logout success');
            return { ...state, loginError: false, username: null };

        case 'GET_PROFILE_SUCCEEDED':
            console.log('Welcome back');
            return { ...state, user: action.user, username: action.username, user_id: action.user_id };

        case 'REGISTRATION_SUCCEEDED':
            console.log('Welcome');
            return { ...state, username: action.username, user_id: action.user_id };

        case 'REGISTRATION_DENIED':
            console.log('Registration Denied');
            return { ...state, registration_errors: action.errors}

        case 'EDIT_PROFILE_SUCCEEDED':
            console.log('Profile Edited');
            return { ...state, edit_profile_succeeded: true}

        default: return state;
    }
};