import './CreateSpot.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { createSpotThunk } from '../../store/spots';
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const CreateSpot = () => {
    const dispatch = useDispatch();
    const [country, setCountry] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [imageURL1, setImageURL1] = useState("");
    const [imageURL2, setImageURL2] = useState("");
    const [imageURL3, setImageURL3] = useState("");
    const [imageURL4, setImageURL4] = useState("");
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const owner = useSelector(state => state.session.user);
    // console.log(owner)
    const SpotImages = [previewImage, imageURL1, imageURL2, imageURL3, imageURL4]
    const newSpot = {
        address: streetAddress,
        city,
        state,
        country,
        name: title,
        description, 
        price,
        SpotImages,
        Owner: owner,
        ownerId: owner?.id,
        lat: Math.random(150).toFixed(2),
        lng: Math.random(150).toFixed(3)
    }
    let newlyCreatedSpot;
    const create = async () => {
        newlyCreatedSpot = await dispatch(createSpotThunk(newSpot));
    };
    
    const spotSelector = useSelector(state => state.spots);
    // console.log(spotSelector)
    const handleSubmit = (e) => {
    e.preventDefault();
    create();
    console.log(newlyCreatedSpot);
    // history.push(`/spots/${newlyCreatedSpot?.id}`)
    };
  
    const submitButton = "spot-submit-button";
  

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
            Country
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              placeholder="Country"
              className="inputs"
            />
          </label>
          {errors.country && <p>{errors.country}</p>}
          <label>
            Street Address
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              required
              placeholder="Address"
              className="inputs"
            />
          </label>
          {errors.streetAddress && <p>{errors.streetAddress}</p>}
          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="City"
              className="inputs"
            />
          </label>
          {errors.city && <p>{errors.city}</p>}
          <label>
            State
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              placeholder="STATE"
              className="inputs"
            />
          </label>
          {errors.state && <p>{errors.state}</p>}
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
              required
              placeholder="Please write at least 30 characters"
              className="inputs"
              rows='7'
              cols='40'
              minLength='30'
            />
          </label>
          {errors.description && <p>{errors.description}</p>}
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
              required
              placeholder="Name of your spot"
              className="inputs"
            />
          </label>
          {errors.title && <p>{errors.title}</p>}
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
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              placeholder="Price per night (USD)"
              className="inputs"
              min='1.00'
            />
          </label>
          {errors.price && <p>{errors.price}</p>}
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
              required
              placeholder="Preview Image URL"
              className="inputs"
            />
          </label>
          {errors.previewImage && <p>{errors.previewImage}</p>}
          <label>
            <input
              type="url"
              value={imageURL1}
              onChange={(e) => setImageURL1(e.target.value)}
              placeholder="Image URL"
              className="inputs"
            />
          </label>
          {errors.imageURL1 && <p>{errors.imageURL1}</p>}
          <label>
            <input
              type="url"
              value={imageURL2}
              onChange={(e) => setImageURL2(e.target.value)}
              placeholder="Image URL"
              className="inputs"
            />
          </label>
          {errors.imageURL2 && <p>{errors.imageURL2}</p>}
          <label>
            <input
              type="url"
              value={imageURL3}
              onChange={(e) => setImageURL3(e.target.value)}
              placeholder="Image URL"
              className="inputs"
            />
          </label>
          {errors.imageURL3 && <p>{errors.imageURL3}</p>}
          <label>
            <input
              type="url"
              value={imageURL4}
              onChange={(e) => setImageURL4(e.target.value)}
              placeholder="Image URL"
              className="inputs"
            />
          </label>
          {errors.imageURL4 && <p>{errors.imageURL4}</p>}
          <button type="submit" className={submitButton} >Create Spot</button>
        </form>
      </div>
    );
};

export default CreateSpot;