import { csrfFetch } from "./csrf";

//ACTION TYPES
export const LOAD_REVIEW = 'reviews/LOAD_REVIEW';
export const LOAD_SPECIFIC_REVIEW = 'reviews/LOAD_SPECIFIC_REVIEW';
export const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

//ACTIONS
export const actionLoadReviews = (review) => {
    return {
        type: LOAD_REVIEW,
        review
    }
};

export const actionLoadSpecificReview = (review) => {
    return {
        type: LOAD_SPECIFIC_REVIEW,
        review
    }
};

export const actionCreateNewReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

export const actionDeleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

//THUNKS
export const loadReviewThunk = (data) => async (dispatch, getState) => {

};

export const loadSpecificReviewThunk = (data) => async (dispatch, getState) => {

};

export const loadUserReviewsThunk = (data) => async (dispatch, getState) => {

};

export const createReviewThunk = (data) => async (dispatch, getState) => {

};

export const deleteReviewThunk = data => async (dispatch, getState) => {

}

//REDUCER
const initialState = {
    reviews: {
        spot: {
            User: {},
            ReviewImages: []
        },
        user: {
            User: {},
            Spot: {},
            ReviewImages: []
        }
    }
}
const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_REVIEW:
            return;
        case LOAD_SPECIFIC_REVIEW: 
            return;
        case CREATE_REVIEW:
            return;
        case DELETE_REVIEW:
            return;
        default:
            return state;
    }
};


export default reviewsReducer;