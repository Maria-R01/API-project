import './SpecificSpot.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadSpecificSpotThunk } from '../../store/spots';
import Reviews from '../Reviews';

const SpecificSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(loadSpecificSpotThunk(spotId))
    }, [dispatch]);
    
    const spot = useSelector(state => state.spots.singleSpot);
    console.log('spot in specific spot: ', spot)
    // console.log(spot);
    // if(!spot.SpotImages.length) console.log('no images available in SpotImages on singleSpot');
    // if(!spot.SpotImages.length) return null;
    const fiveImages = [];
    console.log(spot.SpotImages)
    if(spot) {
        for(let ele of spot.SpotImages) {
            if(fiveImages.length <= 5) fiveImages.push(ele);
            else return;
        };
    }
    let fourImages;
    if(fiveImages.length) fourImages = fiveImages.slice(1, 5);
    return (
        <div className='root'>
            <div className='topHeadings' >
                <h3>{spot.name}</h3>
                <h5>{spot.city}, {spot.state}, {spot.country}</h5>
            </div>
            <div className='imagesContainer'>
                <div className='firstImage'>
                {fiveImages[0]? <img alt='' src={`${fiveImages[0]?.url}`}></img>  : <h4>Images coming soon...</h4>}
                </div>
                <div className='fourImages'> 
                {fourImages?.map(spot => (
                    <div className={`image${spot.id}`} key={`${spot.id}`}>
                        <img alt='' src={`${spot.url}`} id={`img${spot.id}`}></img>
                    </div>
                ))}
                </div>
            </div>
            <div className='details-container'>
                <div className='description-container'>
                    <h3 className='hostInfo'>
                        Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
                    </h3>
                    <div className='description'>
                        <p>
                            {spot.description}
                        </p> 
                    </div>
                </div>
                <div className='details-box-container'>
                    <div className='details-box-top'>
                        <div className='price'>
                            ${spot.price?.toFixed(2)}
                        </div>
                        <span className='night'>night</span>
                        <div className='ratings-reviews'>
                            <i className="fa-solid fa-star icon"></i> 
                            <span className='avgStarRating'>{spot.avgStarRating? spot.avgStarRating.toFixed(1) : `New`}</span>
                            <div className='numReviews'>{spot.numReviews === 1 ? `${spot.numReviews} review` : `${spot.numReviews} reviews`}</div>
                        </div>
                    </div>
                    <div className='details-box-bottom'>
                        <button className='reserve-button' onClick={() => alert('Feature Coming Soon...')}>Reserve</button>
                    </div>
                </div>
            </div>
            <div className='bottom'></div>
            <div className='reviews-container'>
                <div className='star-rating-container'>
                <i className="fa-solid fa-star icon"></i> 
                <span className='avgStarRating'>{spot.avgStarRating? spot.avgStarRating.toFixed(1) : `New`}</span>
                <div className='numReviews'>{spot.numReviews === 1 ? `${spot.numReviews} review` : `${spot.numReviews} reviews`}</div>
                </div>
                    <Reviews />
            </div>
        </div>
        // <></>
    )
};


export default SpecificSpot;