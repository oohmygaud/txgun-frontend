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
            return { ...state, username: action.username };

        default: return state;
    }
};