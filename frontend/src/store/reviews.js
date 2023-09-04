import { csrfFetch } from "./csrf";

//ACTION TYPES
export const LOAD_REVIEWS = 'reviews/LOAD_REVIEW';
export const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

//ACTIONS
export const actionLoadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
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

export const createReviewThunk = (data) => async (dispatch, getState) => {
    const { spotId, review, stars } = data;
    const newReview = { review, stars };
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReview)
    });
    const userRes = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if(res.ok && userRes.ok) {
        // const reviewCreated = await res.json();
        const reviewsObj = await userRes.json();
        dispatch(actionLoadReviews(reviewsObj));
        return reviewsObj;
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const deleteReviewThunk = data => async (dispatch, getState) => {
    const res = await csrfFetch(`/api/reviews/${data}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });

    if(res.ok) {
        dispatch(actionDeleteReview(data))
    } else {
        const errors = await res.json();
        return errors;
    }
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
            reviewsDataArr.map(review => stateCopy.allReviews[review.id] = review); 
            return stateCopy;
        // case CREATE_REVIEW:
        //     console.log("state before creating review: ", stateCopy)
        //     state.allReviews[action.review.id] = action.review
        //     console.log("state after creating review: ", stateCopy)
        //     return stateCopy
        case DELETE_REVIEW:
            stateCopy.allReviews = {...state.allReviews};
            console.log("state before deleting review: ", stateCopy)
            delete stateCopy.allReviews[action.reviewId];
            console.log("state after deleting review: ", stateCopy)
            return stateCopy;
        default:
            return state;
    }
};


export default reviewsReducer;