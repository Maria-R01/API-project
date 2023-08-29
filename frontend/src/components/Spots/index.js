import './Spots.css';
import  { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadSpotsThunk } from '../../store/spots';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { Tooltip } from 'react-tooltip'

const Spots = () => {
    const allSpots = [];
    const dispatch = useDispatch();
    const spotsData = useSelector(state => state.spots.allSpots);
    // console.log(spotsData)
    // const spotsDataArr = Object.values(spotsData);
    // spotsDataArr.map(spot => allSpots.push(spot));
    Object.values(spotsData)?.map(spot => allSpots.push(spot));


    useEffect(() => {
        dispatch(loadSpotsThunk());
    }, [dispatch]);

    return (
        <>
        {/* <h1>All Spots Component</h1> */}
        <div className='allSpots'>
            {allSpots.map(spot => (
                <div className='tile' key={spot.id}>
                    <NavLink to={`/spots/${spot.id}`} className='spotTile' data-tip={`${spot.name}`} >
                        <div>
                            <div className='spotTileImage'>
                                <img alt={`${spot.name}`} src={spot.previewImage}></img>
                        </div>
                        <div>
                            <div className='spotTileInfo'>
                                <div className='locationAndPrice'>
                                    <div className='spotLocation'>
                                        {spot.city}, {spot.state}
                                    </div>
                                    <div className='spotPrice'>
                                    ${spot.price} night
                                    </div>
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