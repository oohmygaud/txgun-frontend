export const loadSubscriptionList = () => ({
    type: 'LOAD_SUBSCRIPTIONS',

});

export const loadSubscriptionDetail = (id) => ({
    type: 'LOAD_SUBSCRIPTION_DETAIL',
    id
});

export const loadSubscriptionTransactions = (id, page=1) => ({
    type: 'LOAD_SUBSCRIPTION_TRANSACTIONS',
    id,
    page
});

export const createSubscription = (data) => ({
    type: 'CREATE_SUBSCRIPTION',
    data
});

export const editSubscription = (id, data) => ({
    type: 'EDIT_SUBSCRIPTION',
    id,
    data
});