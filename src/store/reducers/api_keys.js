export default (state = {}, action) => {
    switch (action.type) {

        case 'LOAD_API_KEYS_SUCCEEDED':
            return { ...state, data: action.data };

        case 'CREATE_API_KEY_SUCCEEDED':
            return { ...state, created: action.data };
            
        case 'LOAD_API_KEY_DETAIL_SUCCEEDED':
            return { ...state, detail: action.data };
           
        
        default: return state;
    }
};