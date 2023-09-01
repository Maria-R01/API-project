import './Reviews.css';
import  { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadReviewsThunk } from '../../store/reviews';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';

const Reviews = ({spotId}) => {
    console.log('Inside Reviews Component');
    const spotIdNum = Number(spotId);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadReviewsThunk(spotIdNum));
    }, [dispatch]);

    return (
        <>
            <h3>REVIEWS COMING SOON</h3>
        </>        
    )
};

export default Reviews; 