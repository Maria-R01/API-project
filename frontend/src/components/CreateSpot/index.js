import './CreateSpot.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpotImageThunk, createSpotThunk, loadSpecificSpotThunk } from '../../store/spots';
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const CreateSpot = ({ spot }) => {
    const dispatch = useDispatch();
    const [country, setCountry] = useState(spot? spot.country : '');
    const [streetAddress, setStreetAddress] = useState(spot? spot.address : "");
    const [city, setCity] = useState(spot? spot.city : "");
    const [state, setState] = useState(spot? spot.state : "");
    const [description, setDescription] = useState(spot? spot.description : "");
    const [title, setTitle] = useState(spot? spot.name : "");
    const [price, setPrice] = useState(spot? spot.price : "");
    const [previewImage, setPreviewImage] = useState(spot? spot.SpotImages[0]?.url : "");
    const [imageURL1, setImageURL1] = useState(spot? spot.SpotImages[1]?.url : "");
    const [imageURL2, setImageURL2] = useState(spot? spot.SpotImages[2]?.url : "");
    const [imageURL3, setImageURL3] = useState(spot? spot.SpotImages[3]?.url : "");
    const [imageURL4, setImageURL4] = useState(spot? spot.SpotImages[4]?.url : "");
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const owner = useSelector(state => state.session.user);
    const spotSelector = useSelector(state => state.spots.singleSpot);
    const newSpot = {
        address: streetAddress,
        city,
        state,
        country,
        name: title,
        description, 
        price,
        lat: (Math.random() * 100).toFixed(2),
        lng: (Math.random()* 100).toFixed(2)
    }
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if(!streetAddress) errors.streetAddress = 'Address is required';
    if(!country) errors.country = 'Country is required';
    if(!city) errors.city = 'City is required';
    if(!state) errors.state = 'State is required';
    if(description.length < 30) errors.description = 'Description needs a minimum of 30 characters';
    if(!title) errors.title = 'Name is required';
    if(!price) errors.price = 'Price is required';
    if(!previewImage) errors.previewImage = 'Preview image required';
    if(previewImage && !previewImage.match(/\.(jpg|jpeg|png)$/i)) errors.previewImage = 'Image URL must end in .png, .jpg or .jpeg';
    if(imageURL1 && !imageURL1.match(/\.(jpg|jpeg|png)$/i)) errors.imageURL1 = 'Image URL must end in .png, .jpg or .jpeg';
    if(imageURL2 && !imageURL2.match(/\.(jpg|jpeg|png)$/i)) errors.imageURL2 = 'Image URL must end in .png, .jpg or .jpeg';
    if(imageURL3 && !imageURL3.match(/\.(jpg|jpeg|png)$/i)) errors.imageURL3 = 'Image URL must end in .png, .jpg or .jpeg';
    if(imageURL4 && !imageURL4.match(/\.(jpg|jpeg|png)$/i)) errors.imageURL4 = 'Image URL must end in .png, .jpg or .jpeg';
 
    if(Object.keys(errors).length) {
        setErrors(errors);
    } else {
        const newlyCreatedSpot = await dispatch(createSpotThunk(newSpot));
        const SpotImages = [previewImage, imageURL1, imageURL2, imageURL3, imageURL4]
        for(let spotImage of SpotImages) {
            if(spotImage) {
                const payload = {
                    spotId: newlyCreatedSpot.id,
                    url: spotImage,
                    preview: true
                };
                await dispatch(createSpotImageThunk(payload));
            }
        };
        await dispatch(loadSpecificSpotThunk(newlyCreatedSpot.id));
        if(newlyCreatedSpot) history.push(`/spots/${newlyCreatedSpot.id}`);
    }
}
  

    return (
        <div id="new-spot-form">
        <h2 className="new-spot-heading">Create a new Spot</h2>
        <h4>Where's your place located?</h4>
        <p>
            Guest will only get your exact address once they book a reservation.
        </p>
        <form onSubmit={handleSubmit} className="new-spot-form">
          {/* {console.log(errors)} */}
          <label>
            Country {errors.country && <span className='errors'>{errors.country}</span>}
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            //   required
              placeholder="Country"
              className="inputs"
            />
          </label>
          <label>
            Street Address {errors.streetAddress && <span className='errors'>{errors.streetAddress}</span>}
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            //   required
              placeholder="Address"
              className="inputs"
            />
          </label>
          <label>
            City {errors.city && <span className='errors' >{errors.city}</span>}
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            //   required
              placeholder="City"
              className="inputs"
            />
          </label>
          <label>
            State {errors.state && <span className='errors' >{errors.state}</span>}
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            //   required
              placeholder="STATE"
              className="inputs"
            />
          </label>
          <div>
            <div>
                <h4>Describe your place to guests</h4>
            </div>
            <div>
                <p>
                    Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.
                </p>
            </div>
          </div>
          <label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            //   required
              placeholder="Please write at least 30 characters"
              className="inputs"
              rows='7'
              cols='40'
              minLength='30'
            />
          </label>
          {errors.description && <p className='errors' >{errors.description}</p>}
          <div>
            <div>
                <h4>Create a title for your spot</h4>
            </div>
            <div>
                <p>
                    Catch guests' attention with a spot title that highlights what makes your place special.
                </p>
            </div>
          </div>
          <label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            //   required
              placeholder="Name of your spot"
              className="inputs"
            />
          </label>
          {errors.title && <p className='errors' >{errors.title}</p>}
          <div>
            <div>
                <h4>Set a base price for your spot</h4>
            </div>
            <div>
                <p>
                    Competitive pricing can help your listing stand out and rank higher in search results.
                </p>
            </div>
          </div>
          <label>
            <span>$</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            //   required
              placeholder="Price per night (USD)"
              className="inputs"
              min='1.00'
              step="0.01"
            />
          </label>
          {errors.price && <p className='errors' >{errors.price}</p>}
          <div>
            <div>
                <h4>Liven up your spot with photos</h4>
            </div>
            <div>
                <p>
                    Submit a link to at least one photo to publish your spot.
                </p>
            </div>
          </div>
          <label>
            <input
              type="url"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
            //   required
              placeholder="Preview Image URL"
              className="inputs"
            />
          </label>
          {errors.previewImage && <p className='errors' >{errors.previewImage}</p>}
          <label>
            <input
              type="url"
              value={imageURL1}
              onChange={(e) => setImageURL1(e.target.value)}
              placeholder="Image URL"
              className="inputs"
            />
          </label>
          {errors.imageURL1 && <p className='errors' >{errors.imageURL1}</p>}
          <label>
            <input
              type="url"
              value={imageURL2}
              onChange={(e) => setImageURL2(e.target.value)}
              placeholder="Image URL"
              className="inputs"
            />
          </label>
          {errors.imageURL2 && <p className='errors' >{errors.imageURL2}</p>}
          <label>
            <input
              type="url"
              value={imageURL3}
              onChange={(e) => setImageURL3(e.target.value)}
              placeholder="Image URL"
              className="inputs"
            />
          </label>
          {errors.imageURL3 && <p className='errors' >{errors.imageURL3}</p>}
          <label>
            <input
              type="url"
              value={imageURL4}
              onChange={(e) => setImageURL4(e.target.value)}
              placeholder="Image URL"
              className="inputs"
            />
          </label>
          {errors.imageURL4 && <p className='errors' >{errors.imageURL4}</p>}
          <button type="submit" className="spot-submit-button" >Create Spot</button>
        </form>
      </div>
    );
};

export default CreateSpot;