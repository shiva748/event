import axios from 'axios';
import {
  GET_EVENTS,
  ADD_EVENT,
  EVENT_ERROR,
  REGISTER_FOR_EVENT,
  CANCEL_REGISTRATION,
  GET_USER_EVENTS,
  SET_LOADING,
  CLEAR_EVENTS
} from './types';

// Get all events
export const getEvents = () => async dispatch => {
  try {
    setLoading()(dispatch);
    
    const res = await axios.get('/api/events');

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err.response?.data?.msg || 'Error fetching events'
    });
  }
};

// Add new event
export const addEvent = event => async dispatch => {
  try {
    const res = await axios.post('/api/events', event);

    dispatch({
      type: ADD_EVENT,
      payload: res.data
    });

    return true;
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err.response?.data?.msg || 'Error creating event'
    });
    return false;
  }
};

// Register for an event
export const registerForEvent = eventId => async dispatch => {
  try {
    const res = await axios.post(`/api/events/${eventId}/register`);

    dispatch({
      type: REGISTER_FOR_EVENT,
      payload: res.data
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err.response?.data?.msg || 'Error registering for event'
    });
    throw err;
  }
};

// Cancel registration
export const cancelRegistration = (eventId, userId) => async dispatch => {
  try {
    await axios.delete(`/api/events/${eventId}/cancel/${userId}`);

    dispatch({
      type: CANCEL_REGISTRATION,
      payload: eventId
    });
    
    return true;
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err.response?.data?.msg || 'Error canceling registration'
    });
    return false;
  }
};

// Get user's events
export const getUserEvents = userId => async dispatch => {
  try {
    setLoading()(dispatch);
    
    const res = await axios.get(`/api/users/${userId}/events`);

    dispatch({
      type: GET_USER_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err.response?.data?.msg || 'Error fetching user events'
    });
  }
};

// Set loading
export const setLoading = () => dispatch => {
  dispatch({ type: SET_LOADING });
};

// Clear events
export const clearEvents = () => dispatch => {
  dispatch({ type: CLEAR_EVENTS });
}; 