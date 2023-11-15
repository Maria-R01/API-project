import { csrfFetch } from "./csrf";

// Action types
const LOAD_BOOKINGS = "bookings/LOAD_BOOKINGS";
const ADD_BOOKING = "bookings/ADD_BOOKING";
const UPDATE_BOOKING = "bookings/UPDATE_BOOKING";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";

// Action creators
export const loadBookings = (bookings) => ({
  type: LOAD_BOOKINGS,
  payload: bookings,
});

export const addBooking = (booking) => ({
  type: ADD_BOOKING,
  payload: booking,
});

export const updateBooking = (updatedBooking) => ({
  type: UPDATE_BOOKING,
  payload: updatedBooking,
});

export const deleteBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  payload: bookingId,
});

// Thunks
export const getBookingsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/current");
  if (response.ok) {
    const bookings = await response.json();
    console.log("GET BOOKINGS THUNK RESPONSE", bookings);
    dispatch(loadBookings(bookings));
  }
};

export const createBookingThunk = (spotId, bookingData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (response.ok) {
    const newBooking = await response.json();
    dispatch(addBooking(newBooking));
    return newBooking;
  }
};

export const updateBookingThunk =
  (bookingId, bookingData) => async (dispatch) => {
    console.log("BOOKING ID: ", bookingId);
    console.log("BOOKING DATA: ", bookingData);
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData[0]),
    });

    if (response.ok) {
      const updatedBooking = await response.json();
      console.log("UPDATED BOOKING: ", updatedBooking);
      console.log('UPDATED BOOKING IN THUNK TYPEOF: ', typeof updatedBooking)
      dispatch(updateBooking(updatedBooking));
      return updatedBooking;
    }
  };

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteBooking(bookingId));
  }
};

// Reducer
const initialState = [];

const bookingsReducer = (state = initialState, action) => {
  console.log("STATE:", state);
  switch (action.type) {
    case LOAD_BOOKINGS:
      return action.payload.Bookings || [];
    case ADD_BOOKING:
      return [...state, action.payload];
    case UPDATE_BOOKING:
      console.log("STATE BEFORE MAPPING IN THE UPDATE BOOKING CASE: ", state);
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
