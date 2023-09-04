import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import './DeleteSpot.css';

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
        <div className="delete-spot-container">
            <div>
                <h2 className="confirmDelete">Confirm Delete</h2>
            </div>
            <div>
                <div className="question">
                    Are you sure you want to remove this spot from the listings? 
                </div>
            </div>
            <div className="yes-no-container">
                <button className="yes" onClick={handleDelete}>Yes (Delete Spot)</button>
                <button className="no" onClick={closeModal}>No (Keep Spot)</button>
            </div>
        </div>
    )
};

export default DeleteSpot;