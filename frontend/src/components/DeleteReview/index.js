import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";

const DeleteReview = ({ reviewId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = e => {
        e.preventDefault();
        return dispatch(deleteReviewThunk(reviewId))
        .then(closeModal())
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              return data.errors;
            }
        }
        )
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