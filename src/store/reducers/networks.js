export default (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_NETWORKS_SUCCEEDED':
      return { ...state, data: action.data }

    default: return state
  }
}
