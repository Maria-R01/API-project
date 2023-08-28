//ACTION TYPES
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';

//ACTIONS
export const actionLoadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
};

//THUNKS
export const loadSpotsThunk = (data) => async (dispatch, getState) => {
    const response = await fetch("/api/spots");
    // console.log('response in thunk: ' , response);
    if(response.ok){
        const spots = await response.json();
        dispatch(actionLoadSpots(spots));
    } else {
        const errors = response.json();
        return errors;
    }
}


//REDUCER
// const initializedState = {}
const spotsReducer = (state = {}, action) => {
    switch(action.type) {
        case(LOAD_SPOTS):
            const spotsData = {}
            spotsData.allSpots = {}
            const spotsDataArr = Object.values(action.spots.Spots)
            // console.log('SpotsDataArr: ', spotsDataArr)
            spotsDataArr.map(spot => spotsData.allSpots[spot.id]= spot);
            return spotsData;
        default:
            return state;
    }
};


export default spotsReducer;