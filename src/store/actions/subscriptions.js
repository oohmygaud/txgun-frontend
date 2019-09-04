export const loadSubscriptionList = (options) => ({
  type: 'LOAD_SUBSCRIPTIONS',
  options
})

export const loadSubscriptionDetail = (id) => ({
  type: 'LOAD_SUBSCRIPTION_DETAIL',
  id
})

export const loadSubscriptionTransactions = (id, page = 1) => ({
  type: 'LOAD_SUBSCRIPTION_TRANSACTIONS',
  id,
  page
})

export const createSubscription = (data) => ({
  type: 'CREATE_SUBSCRIPTION',
  data
})

export const editSubscription = (id, data) => ({
  type: 'EDIT_SUBSCRIPTION',
  id,
  data
})

export const pauseSubscription = (id, options) => ({
  type: 'PAUSE_SUBSCRIPTION',
  id,
  options
})

export const unpauseSubscription = (id, options) => ({
  type: 'UNPAUSE_SUBSCRIPTION',
  id,
  options
})

export const archiveSubscription = (id) => ({
  type: 'ARCHIVE_SUBSCRIPTION',
  id
})

export const unarchiveSubscription = (id) => ({
  type: 'UNARCHIVE_SUBSCRIPTION',
  id
})

export const getABI = (address) => ({
  type: 'GET_ABI',
  address
})
