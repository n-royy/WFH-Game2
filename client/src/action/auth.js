import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  GET_DATA,
  DATA_ERROR,
  USER_LOADED,
  AUTH_ERROR,
  UPDATED_SUCCESS,
  UPDATED_ERROR,
} from './types';

//Register User
export const register = (name, unit) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, unit });

  try {
    const res = await axios.post('/api/user', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    const userID = res.data.payload.user.id;
    localStorage.userId = userID;
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//login
export const login = (name) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Load User
export const loadUser = (userID) => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    setAuthToken(token);
  }
  const config = {
    headers: {
      authorization: `${token}`,
    },
  };

  try {
    const res = await axios.get(`api/auth`, config);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Report Result
export const reportResult = (payload) => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    setAuthToken(token);
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
      authorization: `${token}`,
    },
  };
  const body = JSON.stringify(payload);

  try {
    const res = await axios.post(`api/profile`, body, config);

    dispatch({
      type: UPDATED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATED_ERROR,
    });
  }
};

//get all users
export const getDataReport = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_DATA,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DATA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
