import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk, loadUserSpotsThunk } from "../../store/spots";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const DeleteSpot = ({ spotId }) => {
    // console.log('{spotId}: ', spotId)
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    // const history = useHistory();
    // const userSpots = useSelector(state => state.spots.allSpots);

    const handleDelete = e => {
        e.preventDefault();
        return dispatch(deleteSpotThunk(spotId))
        // .then(history.push('/spots/current'))
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