import './UserSpots.css';
import '../Spots/Spots.css'
import { loadUserSpotsThunk } from '../../store/spots';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteSpot from '../DeleteSpot';

const UserSpots = () => {
    const userSpots = [];
    const dispatch = useDispatch();
    const userSpotsObj = useSelector(state => state.spots.allSpots);
    Object.values(userSpotsObj)?.map(spot => userSpots.push(spot));
    // console.log('userSpots: ', userSpots)


    useEffect(() => {
        dispatch(loadUserSpotsThunk());
    }, [dispatch])

    
    return (
        // <>
        //     <h2>Spots for Current Users</h2>
        // </>
         <div className='allSpots'>
            <div className='headings'>
                <div>
                    <h2>Manage Your Spots</h2>
                </div>
                <div>
                    <button className='manage-spots-buttons'>
                        <NavLink to='/spots/new'>Create a New Spot</NavLink>
                    </button> 
                </div>
            </div>
            {userSpots.map(spot => (
                <div className='tile' key={spot.id} title={spot.name}>
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
                                    <div className='spotPrice-container'>
                                        <div className='spotPrice'>
                                        ${spot.price} 
                                        </div>
                                        <span>night</span>
                                    </div>
                                </div>
                                <div className='avgRating'>
                                        <i className="fa-solid fa-star"></i> {spot.avgRating? spot.avgRating.toFixed(1) : `New`}
                                </div>
                            </div>
                        </div>
                        </div>
                    </NavLink>
                    <div className='buttons-container'>
                        <div>
                            <button className='manage-spots-buttons'>
                                <NavLink to={`/spots/${spot.id}/edit`}>Update</NavLink>
                            </button>
                        </div>
                        <div className='delete-modal-container'>
                            <OpenModalButton buttonText={`Delete`} modalComponent={<DeleteSpot spotId={spot.id} />} />
                        </div>
                    </div>
                </div>
            ))}
        </div>     
    )
};

export default UserSpots;