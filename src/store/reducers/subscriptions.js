export default (state = {}, action) => {
    switch (action.type) {

        case 'LOAD_SUBSCRIPTIONS_SUCCEEDED':
            return { ...state, data: action.data };

        case 'LOAD_SUBSCRIPTION_DETAIL_SUCCEEDED':
            return { ...state, detail: action.data };

        case 'LOAD_SUBSCRIPTION_TRANSACTIONS_SUCCEEDED':
            return { ...state, transactions: action.data };

        default: return state;
    }
};