export default (state = {}, action) => {
    switch (action.type) {

        case 'LOAD_SUBSCRIPTIONS_SUCCEEDED':
            return { ...state, data: action.data };

        
        case 'CLEAR_SUBSCRIPTION_DETAILS':
            return { ...state, detail: null };

        case 'LOAD_SUBSCRIPTION_DETAIL_SUCCEEDED':
            return { ...state, detail: action.data };

        case 'LOAD_SUBSCRIPTION_TRANSACTIONS_SUCCEEDED':
            return { ...state, transactions: action.data };

        case 'CREATE_SUBSCRIPTION_SUCCEEDED':
            return { ...state, created: action.data };

        case 'EDIT_SUBSCRIPTION_SUCCEEDED':
            return { ...state, edited: action.data };
            
        default: return state;
    }
};