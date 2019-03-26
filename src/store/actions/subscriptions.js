export const loadSubscriptionList = () => ({
    type: 'LOAD_SUBSCRIPTIONS',

});

export const loadSubscriptionDetail = (id) => ({
    type: 'LOAD_SUBSCRIPTION_DETAIL',
    id
});

export const loadSubscriptionTransactions = (id) => ({
    type: 'LOAD_SUBSCRIPTION_TRANSACTIONS',
    id
});