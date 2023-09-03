import './StarRating.css';
import { useEffect, useState } from 'react';

const StarRating = ({starsRating, starInputClick}) => {
    const [rating, setRating] = useState(starsRating);
    

    useEffect(() => {
        setRating(starsRating)
    }, [starsRating]);

    return (
        <div className='starsRating-container'>
            <div 
            className={rating >= 1 ? "filled" : "empty"}
            onMouseEnter={() => setRating(1)}
            onMouseLeave={() => setRating(starsRating)}
            onClick={() => starInputClick(1)}
            >
            <i className='fa fa-star'></i>
            </div>
            <div 
            className={rating >= 2 ? "filled" : "empty"}
            onMouseEnter={() => setRating(2)}
            onMouseLeave={() => setRating(starsRating)}
            onClick={() => starInputClick(2)}
            >
            <i className='fa fa-star'></i>
            </div>
            <div 
            className={rating >= 3 ? "filled" : "empty"}
            onMouseEnter={() => setRating(3)}
            onMouseLeave={() => setRating(starsRating)}
            onClick={() => starInputClick(3)}
            >
            <i className='fa fa-star'></i>
            </div>
            <div 
            className={rating >= 4 ? "filled" : "empty"}
            onMouseEnter={() => setRating(4)}
            onMouseLeave={() => setRating(starsRating)}
            onClick={() => starInputClick(4)}
            >
            <i className='fa fa-star'></i>
            </div>
            <div 
            className={rating >= 5 ? "filled" : "empty"}
            onMouseEnter={() => setRating(5)}
            onMouseLeave={() => setRating(starsRating)}
            onClick={() => starInputClick(5)}
            >
            <i className='fa fa-star'></i>
            </div>
        </div>
    )

};


export default StarRating