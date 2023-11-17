import { csrfFetch } from './csrf';

// Action types
const LOAD_BOOKINGS = 'bookings/LOAD_BOOKINGS';
const ADD_BOOKING = 'bookings/ADD_BOOKING';
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING';
const DELETE_BOOKING = 'bookings/DELETE_BOOKING';

// Action creators
export const loadBookings = (bookings) => ({
  type: LOAD_BOOKINGS,
  payload: bookings,
});

export const addBooking = (booking) => ({
  type: ADD_BOOKING,
  payload: booking,
});

export const updateBooking = (booking) => ({
  type: UPDATE_BOOKING,
  payload: booking,
});

export const deleteBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  payload: bookingId,
});

// Thunks
export const getBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings/current');
    if (response.ok) {
      const bookings = await response.json();
      dispatch(loadBookings(bookings));
    }
  };
  
  export const createBookingThunk = (spotId, bookingData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
  
    if (response.ok) {
      const newBooking = await response.json();
      dispatch(addBooking(newBooking));
      return newBooking;
    }
  };
  
  export const updateBookingThunk = (bookingId, bookingData) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
  
    if (response.ok) {
      const updatedBooking = await response.json();
      dispatch(updateBooking(updatedBooking));
      return updatedBooking;
    }
  };
  
  export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    console.log('BOOKING ID: ', bookingId)
    console.log('BOOKING ID TYPE: ', typeof bookingId)
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      dispatch(deleteBooking(bookingId));
    }
  };

// Reducer
const initialState = [];

const bookingsReducer = (state = initialState, action) => {
    console.log('STATE: ', state)
  switch (action.type) {
    case LOAD_BOOKINGS:
      return action.payload;
    case ADD_BOOKING:
      return [...state, action.payload];
    case UPDATE_BOOKING:
      return state.map((booking) =>
        booking.id === action.payload.id ? action.payload : booking
      );
    case DELETE_BOOKING:
        console.log('ACTION PAYLOAD: ', action.payload)
      return state.Bookings.filter((booking) => booking.id !== action.payload);
    default:
      return state;
  }
};

export default bookingsReducer;
