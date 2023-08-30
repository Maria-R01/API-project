//ACTION TYPES
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const LOAD_SPECIFIC_SPOT = 'spots/LOAD_SPECIFIC_SPOT';
export const LOAD_USER_SPOTS = 'spots/LOAD_USER_SPOTS';

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


//THUNKS
export const loadSpotsThunk = (data) => async (dispatch, getState) => {
    const response = await fetch("/api/spots");
    // console.log('response in thunk: ' , response);
    if(response.ok){
        const spots = await response.json();
        dispatch(actionLoadSpots(spots));
        return spots;
    } else {
        const errors = response.json();
        return errors;
    }
};

export const loadSpecificSpotThunk = (data) => async (dispatch, getState) => {
    const res = await fetch(`/api/spots/${data}`);
    if(res.ok) {
        const spot = await res.json();
        dispatch(actionLoadSpecificSpot(spot));
        return spot;
    } else {
        const errors = res.json();
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
        default:
            return state;
    }
};


export default spotsReducer;