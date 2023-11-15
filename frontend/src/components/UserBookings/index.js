import './UserBookings.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { useModal } from "../../context/Modal";
import OpenModalButton from '../OpenModalButton';
import { getBookingsThunk, updateBookingThunk, deleteBookingThunk } from '../../store/bookings';
import UpdateBookingModal from '../UpdateBooking';

const UserBookings = () => {
    const userBookings = [];
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const UserBookingsObj = useSelector(state => state.bookings.Bookings);
    console.log('UserBookings Array: ', userBookings);
    console.log(UserBookingsObj)
    if (UserBookingsObj) {
        Object.values(UserBookingsObj)?.map(booking => userBookings.push(booking));
    }
    const [selectedBooking, setSelectedBooking] = useState(null);
    console.log('SELECTED BOOKING: ', selectedBooking)

    const handleUpdateBooking = (updatedBooking) => {
        dispatch(updateBookingThunk(updatedBooking));
        closeModal();
    };
      
    const DeleteBookingModal = () => {    
        const handleDelete = () => {
            if (selectedBooking) {
            dispatch(deleteBookingThunk(selectedBooking.id));
            closeModal();
            }
        };
      
    return (
        <div>
        <p>Are you sure you want to delete this booking?</p>
        <button className='delete-booking-modal-button' onClick={handleDelete}>
            Confirm Delete
        </button>
        </div>
    );
    };
      

    useEffect(() => {
        dispatch(getBookingsThunk());
    }, [dispatch])

    
    return (
        // <>
        //     <h2>Bookings for Current Users</h2>
        // </> 
        <div>
            <div className='headings'>
                <div>
                    <h2>Manage Your Bookings</h2>
                </div>
            </div>
            {userBookings?.map(spot => (
                <div className='tile' key={spot.Spot.id} title={spot.Spot.name} >
                    <NavLink to={`/spots/${spot.id}`} className='spotTile' data-tip={`${spot.Spot.name}`} >
                        <div>
                            <div className='spotTileImage'>
                                <img alt={`${spot.Spot.name}`} src={spot.Spot.previewImage}></img>
                        </div>
                        <div>
                            <div className='spotTileInfo'>
                                <div className='locationAndPrice'>
                                    <div className='spotLocation'>
                                        {spot.Spot.city}, {spot.Spot.state}
                                    </div>
                                    <div className='spotPrice-container'>
                                        <div className='spotPrice'>
                                        ${spot.Spot.price.toFixed(2)} 
                                        </div>
                                        <span>night</span>
                                    </div>
                                </div>
                                <div className='avgRating'>
                                        <i className="fa-solid fa-star"></i> {spot.Spot.avgRating? spot.Spot.avgRating.toFixed(1) : `New`}
                                </div>
                            </div>
                        </div>
                        </div>
                    </NavLink>
                    <div className='buttons-container'>
                    <div className='delete-modal-container' onClick={() => setSelectedBooking(spot)}>
                        <OpenModalButton
                        buttonText={`Update Booking`}
                        modalComponent={<UpdateBookingModal startDate={selectedBooking?.startDate || ''} endDate={selectedBooking?.endDate || ''} bookingId={selectedBooking?.id || ''} onUpdate={handleUpdateBooking} />}
                        />
                    </div>
                    <div className='delete-modal-container'>
                        <OpenModalButton
                        buttonText={`Delete Booking`}
                        modalComponent={<DeleteBookingModal />}
                        />
                    </div>
                        {/* <div>
                            <button className='manage-spots-buttons'>
                                <NavLink to={`/spots/${spot.Spot.id}/edit`}>Update</NavLink>
                            </button>
                        </div>
                        <div className='delete-modal-container'>
                            <OpenModalButton buttonText={`Delete`} modalComponent={<DeleteSpot spotId={spot.Spot.id} />} />
                        </div> */}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default UserBookings;