/**
 * Auth module - manage user authentication
 */
import axios from 'axios';

// Reset state
export const RESET_REDUX_STORE = 'RESET_REDUX_STORE';

// Load
export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAIL = 'LOAD_USER_FAIL';

/**
 * Fetches current logged in user given HTTP cookie
 */
export const loadUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const res = await axios.get('/api/current_user');
    dispatch({ type: LOAD_USER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, error });
  }
};

// Reducer
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isLoaded: false,
  user: false,
  error: null,
};

const reducerMap = {
  [LOAD_USER]: (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [LOAD_USER_SUCCESS]: (state, action) => {
    return {
      ...state,
      user: action.payload,
      isAuthenticated: action.payload ? true : false,
      isLoading: false,
      isLoaded: true,
    };
  },
  [LOAD_USER_FAIL]: (state, action) => {
    return {
      ...state,
      isAuthenticated: false,
      isLoading: false,
      isLoaded: true,
      error: action.error,
    };
  },
};

export default function reducer(state = initialState, action = {}) {
  return reducerMap[action.type]
    ? reducerMap[action.type](state, action)
    : state;
}