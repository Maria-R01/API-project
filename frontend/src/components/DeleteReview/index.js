import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import { loadSpecificSpotThunk } from "../../store/spots";
import "./DeleteReview.css";

const DeleteReview = ({ reviewId, spotId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async e => {
        e.preventDefault();
        await dispatch(deleteReviewThunk(reviewId))
        await (dispatch(loadSpecificSpotThunk(spotId)))
        return (closeModal())
    };


    return (
        <div className="deleteReviewContainer">
            <div className="ConfirmDeleteHeading">
                <h2>Confirm Delete</h2>
            </div>
            <div className="deleteReviewQuestionContainer">
                <div>
                    Are you sure you want to delete this review? 
                </div>
            </div>
            <div className="deleteReviewButtonsContainer">
                <button className="yes" onClick={handleDelete}>Yes (Delete Review)</button>
                <button className="no" onClick={closeModal}>No (Keep Review)</button>
            </div>
        </div>
    )
};

export default DeleteReview;