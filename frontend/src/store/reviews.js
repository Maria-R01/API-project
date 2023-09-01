import { csrfFetch } from "./csrf";

//ACTION TYPES
export const LOAD_REVIEWS = 'reviews/LOAD_REVIEW';
export const LOAD_SPECIFIC_REVIEW = 'reviews/LOAD_SPECIFIC_REVIEW';
export const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

//ACTIONS
export const actionLoadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
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
export const loadReviewsThunk = (data) => async (dispatch, getState) => {
    //data being passed in is the spots ID 
    console.log('data before passing into fetch req: ', data)
    const res = await fetch(`/api/spots/${data}/reviews`);
    if(res.ok){
        const reviews = await res.json();
        dispatch(actionLoadReviews(reviews));
        return reviews;
    } else {
        const errors = await res.json();
        return errors;
    }
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
    allReviews: {},
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
const reviewsReducer = (state = initialState, action) => {
    let stateCopy = {...state};
    switch(action.type) {
        case LOAD_REVIEWS:
            stateCopy.allReviews = {};
            const reviewsDataArr = action.reviews.Reviews;
            reviewsDataArr.map(review => stateCopy.allReviews[review.id] = review); //adding to the state but might switch to be in state and then in a allReviews key.
            return stateCopy;
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