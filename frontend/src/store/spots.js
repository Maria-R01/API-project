//ACTION TYPES
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const LOAD_SPECIFIC_SPOT = 'spots/LOAD_SPECIFIC_SPOT';

//ACTIONS
export const actionLoadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
};

export const actionLoadSpecificSpot = (spot) => {
    return {
        type LOAD_SPECIFIC_SPOT,
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

export const loadSpecificSpotThunk = (data) => (dispatch, getState) => {

    
};


//REDUCER
const initialState = {allSpots: {}, singleSpot: {}}
const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case(LOAD_SPOTS):
            const spotsData = {}
            spotsData.allSpots = {}
            const spotsDataArr = Object.values(action.spots.Spots)
            // console.log('SpotsDataArr: ', spotsDataArr)
            spotsDataArr.map(spot => spotsData.allSpots[spot.id]= spot);
            return spotsData;
        case (LOAD_SPECIFIC_SPOT): 
            return
        default:
            return state;
    }
};


export default spotsReducer;