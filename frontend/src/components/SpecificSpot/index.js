import './SpecificSpot.css';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadSpecificSpotThunk } from '../../store/spots';

const SpecificSpot = () => {
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(loadSpecificSpotThunk(spotId))
    }, [dispatch]);

    const spot = useSelector(state => state.spots.singleSpot);
    // const { name, city, state, country, SpotImages, Owner: { firstName, lastName }, avgRating, numReviews } = spot;
    console.log(spot.SpotImages)
    return (
        <div className='root'>
            <div className='topHeadings' >
                <h3>{spot.name}</h3>
                <h5>{spot.city}, {spot.state}, {spot.country}</h5>
            </div>
            <div className='imagesContainer'>
                {/* <div>
                    <img alt='' src={`${spot.SpotImages[0].url}`}></img>
                </div> */}
                <div className='imagesContainer'>
                {spot.SpotImages.map(spot => (
                    <div className={`image${spot.id}`}>
                        <img alt='' src={`${spot.url}`} id={`img${spot.id}`}></img>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
};


export default SpecificSpot;