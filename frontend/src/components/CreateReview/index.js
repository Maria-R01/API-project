import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk, loadReviewsThunk } from "../../store/reviews";
import { useState, useEffect } from "react";
import StarRating from "../StarRating";
import './CreateReview.css';
import { loadSpecificSpotThunk } from "../../store/spots";

const CreateReview = ({spotIdNum}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [reviewText, setReviewText] = useState("")
    const [starsRating, setStarsRating] = useState(0)
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

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({})
        const validationErrors = validationForReview();
        if(Object.values(validationErrors).length) setErrors(validationErrors);

        const newReview = {
            spotId: spotIdNum,
            review: reviewText,
            stars: starsRating
        }
        return dispatch(createReviewThunk(newReview))
        .then(dispatch(loadSpecificSpotThunk(spotIdNum)))
        .then(closeModal())
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              return data.errors;
            }
        }
        )
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
            <div>
                <button className={submitButton} onClick={handleSubmit} disabled={isDisabled()} >Submit Your Review</button>
            </div>
        </div>
    )
};

export default CreateReview;