import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import { loadSpecificSpotThunk } from "../../store/spots";

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
        <div>
            <div>
                <h1>Confirm Delete</h1>
            </div>
            <div>
                <div>
                    Are you sure you want to delete this review? 
                </div>
            </div>
            <div>
                <button className="yes" onClick={handleDelete}>Yes (Delete Review)</button>
                <button className="no" onClick={closeModal}>No (Keep Review)</button>
            </div>
        </div>
    )
};

export default DeleteReview;