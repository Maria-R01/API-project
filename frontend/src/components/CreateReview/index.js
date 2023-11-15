import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk, loadReviewsThunk, updateReviewThunk } from "../../store/reviews";
import { useState, useEffect } from "react";
import StarRating from "../StarRating";
import './CreateReview.css';
import { loadSpecificSpotThunk } from "../../store/spots";

const CreateReview = ({review, spotId, spotIdNum}) => {
    const updatingReview = review?.id !== undefined;
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [reviewText, setReviewText] = useState(updatingReview ? review.review : "")
    const [starsRating, setStarsRating] = useState(updatingReview ? review.stars : 0)
    const [errors, setErrors] = useState({})
    

    const validationForReview = () => {
        const validationErrors = {}
        if(reviewText.length < 10) validationErrors.reviewText = "review must be at least 30 characters";
        if(starsRating < 1 || starsRating > 5) validationErrors.starsRating = "Stars must be between 1 and 5";
        return validationErrors;
    }
    
    const isDisabled = () => {
        const validationErrors = validationForReview();
        return (Object.values(validationErrors).length) ? true : false 
    }

    const starInputClick = (starsClicked) => {
        setStarsRating(starsClicked)
    };

    const newReview = {
        spotId: spotIdNum,
        review: reviewText,
        stars: starsRating
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({})
        const validationErrors = validationForReview();
        if(Object.values(validationErrors).length) {
            setErrors(validationErrors)
            return;
        }
        if(!updatingReview) {
            await dispatch(createReviewThunk(newReview))
            await (dispatch(loadSpecificSpotThunk(spotIdNum)))
        } else {
            const updatedReview = {
                id: review.id,
                spotId: review.spotId,
                stars: Math.round(starsRating),
                review: reviewText,
              };
              await dispatch(updateReviewThunk(updatedReview));
              await dispatch(loadSpecificSpotThunk(spotIdNum));
        }
        closeModal();
        // .then(window.location.reload())
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) {
        //       return data.errors;
        //     }
        // }
        // )
    };
    
    const submitButton = "review-submit-button" + (isDisabled() ? ' disabled' : '')


    return (
        <div className="review-modal">
            <div>
                <h2>How was your stay?</h2>
            </div>
            <div>
                <textarea 
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Leave your review here..."
                className="review-textarea"
                rows='6'
                cols='32'
                />
            </div>
            <div className="stars-input-container">
                <StarRating starsRating={starsRating} starInputClick={starInputClick} className="starRating-input"/> Stars
            </div>
            {updatingReview ? <div>
                <button className={submitButton} onClick={handleSubmit} disabled={isDisabled()} >Update Your Review</button>
            </div> : <div>
                <button className={submitButton} onClick={handleSubmit} disabled={isDisabled()} >Submit Your Review</button>
            </div>}
        </div>
    )
};

export default CreateReview;