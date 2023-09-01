import "./Reviews.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadReviewsThunk } from "../../store/reviews";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const Reviews = ({ spotId }) => {
  // console.log('Inside Reviews Component');
  const spotIdNum = Number(spotId);
  const dispatch = useDispatch();
  const allReviewsArr = [];

  const reviewsDataObj = useSelector((state) => state.reviews.allReviews);
  //   console.log(reviewsDataObj)
  const reviewsDataArr = Object.values(reviewsDataObj).sort((a, b) => a.updatedAt - b.updatedAt);
  //   console.log(reviewsDataArr)
  reviewsDataArr?.map((review) => allReviewsArr.push(review));
  //   console.log(allReviewsArr);

  useEffect(() => {
    dispatch(loadReviewsThunk(spotIdNum));
  }, [dispatch]);


  const formattedDate = (timeStamp) => {
    return new Date(timeStamp).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
  } 

  return (
    <div className="all-reviews-Container">
      {allReviewsArr.length ? (
        allReviewsArr?.map((review) => (
          <div className="each-review-container" key={review.id}>
            <div>
              <div>{review.User.firstName}</div>
            </div>
            <div>
              <div>{formattedDate(review.updatedAt)}</div>
            </div>
            <div>
              <div>{review.review}</div>
            </div>
          </div>
        ))
      ) : (
        <div></div>
        // <div>Reviews coming soon</div>
      )}
    </div>
  );
};

export default Reviews;
