import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from './types';
import setAuthToken from '../../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth/user');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await axios.post('/api/auth/register', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    // Load user after successful registration
    loadUser()(dispatch);
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response?.data?.msg || 'Registration failed'
    });
  }
};

// Login User
export const login = formData => async dispatch => {
  try {
    const res = await axios.post('/api/auth/login', formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    // Load user after successful login
    loadUser()(dispatch);
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response?.data?.msg || 'Login failed'
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

// Clear Errors
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
}; 