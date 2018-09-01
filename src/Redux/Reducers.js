
// initial state for app //
const initialState = {
  gettingData: false,
  users: [],
  error: null
}

// reducer function //
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_DATA_REQUEST':
      return { ...state, gettingData: true, error: null }
    case 'GET_DATA_SUCCESS':
      return { users: action.data, gettingData: false, error: null }
    case 'GET_DATA_FAILURE':
      return { ...state, gettingData: false, error: action.error }
    default:
      return state;
  }
}