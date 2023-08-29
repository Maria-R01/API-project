import './Spots.css';
import  { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadSpotsThunk } from '../../store/spots';
// import { NavLink } from 'react-router-dom';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';

const Spots = () => {
    const allSpots = [];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadSpotsThunk());
    }, [dispatch]);
    const spotsData = useSelector(state => state.spots);
    const spotsDataArr = Object.values(spotsData.allSpots);
    // console.log(spotsDataArr)
    spotsDataArr.map(spot => allSpots.push(spot));
    // console.log('SpotsData in spots component after useSelector: ', spotsData);
    // console.log('allSpots array: ', allSpots)
    return (
        <>
        <h1>All Spots Component</h1>
        <div className='allSpots'>
            {allSpots.map(spot => (
                <div className='tile'>
                    <NavLink to={`/spots/${spot.id}`} key={spot.id} className='spotTile'>
                        <div>
                            <div className='spotTileImage'>
                                <img alt={`${spot.name}`} src={spot.previewImage}></img>
                                {spot.previewImage}
                        </div>
                        <div>
                            <div className='spotTileInfo'>
                                <div className='spotLocation'>
                                    {spot.city}, {spot.state}
                                </div>
                                <div className='spotPrice'>
                                    ${spot.price} night
                                </div>
                                <div className='avgRating'>
                                        <i className="fa-solid fa-star"></i> {spot.avgRating? spot.avgRating : `New`}
                                </div>
                            </div>
                        </div>
                        </div>
                    </NavLink>
                </div>
            ))}
        </div>
        </>        
    )
};

export default Spots; 