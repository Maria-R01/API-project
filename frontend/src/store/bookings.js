// bookings.js
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

// Reducer
const initialState = [];

const bookingsReducer = (state = initialState, action) => {
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
      return state.filter((booking) => booking.id !== action.payload);
    default:
      return state;
  }
};

export default bookingsReducer;
