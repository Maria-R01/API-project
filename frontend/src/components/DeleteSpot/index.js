import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const DeleteSpot = ({ spotId }) => {
    const { closeModal } = useModal;
    const dispatch = useDispatch;
    const history = useHistory();
    const handleDelete = e => {
        e.preventDefault();
        dispatch(deleteSpotThunk(spotId));
        history.push('/spots/current');
        closeModal();
    };


    return (
        <div>
            <div>
                <h1>Confirm Delete</h1>
            </div>
            <div>
                <div>
                    Are you sure you want to remove this spot from the listings? 
                </div>
            </div>
            <div>
                <button className="yes" onClick={handleDelete}>Yes (Delete Spot)</button>
                <button className="no" onClick={closeModal}>No (Keep Spot)</button>
            </div>
        </div>
    )
};

export default DeleteSpot;