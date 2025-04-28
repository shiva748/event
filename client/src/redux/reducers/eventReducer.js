import {
  GET_EVENTS,
  ADD_EVENT,
  EVENT_ERROR,
  REGISTER_FOR_EVENT,
  CANCEL_REGISTRATION,
  GET_USER_EVENTS,
  SET_LOADING,
  CLEAR_EVENTS
} from '../actions/types';

const initialState = {
  events: [],
  userEvents: [],
  current: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        loading: false
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events],
        loading: false
      };
    case REGISTER_FOR_EVENT:
      return {
        ...state,
        events: state.events.map(event => 
          event._id === action.payload._id ? action.payload : event
        ),
        loading: false
      };
    case CANCEL_REGISTRATION:
      return {
        ...state,
        events: state.events.map(event => {
          if (event._id === action.payload) {
            return {
              ...event,
              attendees: event.attendees.filter(userId => userId !== action.payload.userId)
            };
          }
          return event;
        }),
        userEvents: state.userEvents.filter(event => event._id !== action.payload),
        loading: false
      };
    case GET_USER_EVENTS:
      return {
        ...state,
        userEvents: action.payload,
        loading: false
      };
    case EVENT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_EVENTS:
      return {
        ...state,
        events: [],
        userEvents: [],
        loading: false,
        error: null
      };
    default:
      return state;
  }
}; 