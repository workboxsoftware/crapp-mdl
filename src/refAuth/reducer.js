import {
  AUTH_USER, SIGN_OUT_USER, AUTH_ERROR,
  SET_CONNECTED_STATUS, AUTH_CLEAR_ERROR
} from './actions';

const initialState = {
  authenticated: false,
  error: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: null
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        error: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.message
      };
    case AUTH_CLEAR_ERROR:
      const newState = {...state, error: ''};
      return newState;
    case SET_CONNECTED_STATUS:
      return {
        ...state,
        connected: action.status
      };
    default:
      return state;
  }
}
