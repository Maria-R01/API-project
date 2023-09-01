import { csrfFetch } from "./csrf";

//ACTION TYPES
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const LOAD_SPECIFIC_SPOT = 'spots/LOAD_SPECIFIC_SPOT';
export const LOAD_USER_SPOTS = 'spots/LOAD_USER_SPOTS';
export const CREATE_SPOT = 'spots/CREATE_SPOT';
export const DELETE_SPOT = 'spots/DELETE_SPOT';
export const CREATE_SPOT_IMAGE = 'spots/CREATE_SPOT_IMAGE';

//ACTIONS
export const actionLoadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
};

export const actionLoadSpecificSpot = (spot) => {
    return {
        type: LOAD_SPECIFIC_SPOT,
        spot
    }
};

export const actionCreateNewSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

export const actionDeleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

export const actionCreateSpotImage = (spotImage) => {
    return {
        type: CREATE_SPOT_IMAGE,
        spotImage
    }
}

//THUNKS
export const loadSpotsThunk = (data) => async (dispatch, getState) => {
    const response = await fetch("/api/spots");
    // console.log('response in thunk: ' , response);
    if(response.ok){
        const spots = await response.json();
        dispatch(actionLoadSpots(spots));
        return spots;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const createSpotThunk = (data) => async (dispatch, getState) => {
    // console.log('thunk: data: ', data);
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    // console.log('res: ', res)
    if(res.ok) {
        const spot = await res.json();
        dispatch(actionCreateNewSpot(spot));
        return spot;
    } else {
        const errors = await res.json();
        // console.log(errors.errors)
        return errors.errors; 
    }

};

export const createSpotImageThunk = payload  => async (dispatch, getState) => {
    const { spotId, url, preview } = payload;
    const data = { url, preview };
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(res.ok) {
        const spotImage = await res.json();
        dispatch(actionCreateSpotImage(spotImage));
        return spotImage;
    } else {
        const errors = await res.json();
        return errors;
    }

}

export const loadSpecificSpotThunk = (data) => async (dispatch, getState) => {
    const res = await fetch(`/api/spots/${data}`);
    if(res.ok) {
        const spot = await res.json();
        dispatch(actionLoadSpecificSpot(spot));
        return spot;
    } else {
        const errors = await res.json();
        return errors;
    }

};

export const loadUserSpotsThunk = (data) => async (dispatch, getState) => {
    const res = await fetch(`/api/spots/current`);

    if(res.ok) {
        const spots = await res.json();
        dispatch(actionLoadSpots(spots));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const deleteSpotThunk = data => async (dispatch, getState) => {
    const res = await csrfFetch(`/api/spots/${data}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });

    if(res.ok) {
        dispatch(actionDeleteSpot(data))
    } else {
        const errors = await res.json();
        return errors;
    }
}

//REDUCER
const initialState = {
    allSpots: {}, 
    singleSpot: {
        SpotImages: [],
        Owner: {}
    }
}
const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SPOTS:
            const spotsData = {...state}
            spotsData.allSpots = {}
            const spotsDataArr = Object.values(action.spots.Spots)
            spotsDataArr.map(spot => spotsData.allSpots[spot.id]= spot);
            // console.log(spotsData)
            return spotsData;
        case LOAD_SPECIFIC_SPOT: 
            const newState = {
                ...state, 
                singleSpot: action.spot
            };
            // console.log('newState: ', newState);
            return newState;
        case CREATE_SPOT:
            const newSpotState = {
                ...state,
                allSpots: {
                    ...state.allSpots,
                }
                // singleSpot: {
                //     ...state.singleSpot
                // }
            };
            newSpotState.allSpots[action.spot.id] = action.spot;
            newSpotState.singleSpot = action.spot;
            // console.log(newSpotState);
            return newSpotState;

        case CREATE_SPOT_IMAGE:
            const spotImagesState = {
                ...state, 
                singleSpot: {
                    ...state.singleSpot,
                    SpotImages: []
                }
            };
            spotImagesState.singleSpot.SpotImages.push(action.spotImage);
            return spotImagesState;
        case DELETE_SPOT:
            const deleteSpotState = {
                ...state, 
                allSpots: {
                    ...state.allSpots
                }
            }
            delete deleteSpotState.allSpots[action.spotId];
            return deleteSpotState;
        default:
            return state;
    }
};


export default spotsReducer;