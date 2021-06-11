import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_DATA,
  DATA_ERROR,
  AUTH_ERROR,
  USER_LOADED,
} from '../action/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  data: [],
  user: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case GET_DATA:
      return {
        ...state,
        isAuthenticated: true,
        data: payload.data,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        data: [],
        user: null,
      };
    case DATA_ERROR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
