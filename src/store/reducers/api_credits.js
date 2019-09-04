export default (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_API_CREDITS_SUCCEEDED':
      return { ...state, data: action.data }

    case 'LOAD_CREDIT_BALANCE_SUCCEEDED':
      return { ...state, balance: action.data }

    default: return state
  }
}
