import { useParams } from 'react-router-dom/cjs/react-router-dom';
import CreateSpot from '../CreateSpot';
import './EditSpot.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpecificSpotThunk } from '../../store/spots';
import { useEffect } from 'react';

const EditSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const currentSpot = useSelector(state => state.spots.singleSpot);
    const currentUser = useSelector(state => state.session.user);
    const spotOwner = currentSpot.Owner;
    // console.log("currentSpot: ", currentSpot);
    // console.log('currentUser: ', currentUser);
    // console.log('spot owner: ', spotOwner)

    useEffect(() => {
        dispatch(loadSpecificSpotThunk(spotId));
    }, [dispatch])
    
    return (
        <>
        <CreateSpot spot={currentSpot}/>
    </>
    )
};

export default EditSpot;