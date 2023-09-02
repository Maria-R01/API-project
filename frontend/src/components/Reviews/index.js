import "./Reviews.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadReviewsThunk } from "../../store/reviews";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const Reviews = ({ spotId, owner }) => {
  // console.log('Inside Reviews Component');
  const spotIdNum = Number(spotId);
  const dispatch = useDispatch();
//   const allReviewsArr = [];
//   const [isSpotOwner, setIsSpotOwner] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [hasReview, setHasReview] = useState(false);

  const currentUser = useSelector((state) => state.session.user);

  const reviewsDataObj = useSelector((state) => state.reviews.allReviews);
  //   console.log(reviewsDataObj)
  const reviewsDataArr = Object.values(reviewsDataObj).sort(
    (a, b) => {
        const aTime = Date.parse(a.updatedAt);
        const bTime = Date.parse(b.updatedAt);
        return bTime - aTime
    }
  );
  console.log('reviewDataArr: ', reviewsDataArr)
  //   console.log(reviewsDataArr)
//   reviewsDataArr?.map((review) => allReviewsArr.push(review));
  //   console.log(allReviewsArr);

  useEffect(() => {
    dispatch(loadReviewsThunk(spotIdNum));
  }, [dispatch]);

  const doesSpotHaveReviews = () => reviewsDataArr.length ? true : console.log("no reviews in doesSpotHaveReview()")
  const isLoggedIn = () => currentUser?.id ? true : false;
// ;  console.log(isLoggedIn())

  const isSpotOwner = () => {
    // console.log('Is this running? spotOwner')
    // console.log("currentUser?: ", currentUser?.id);
    // console.log("owner: ", owner);
    // console.log("currentId : ", currentUser.id)
    // console.log("owner.id: ", owner.id)
    // console.log('boolean check for spotOwner: ', currentUser && owner && (currentUser.id === owner.id))
    return currentUser && owner && (currentUser.id === owner.id);
  }

  const hasReview = () => reviewsDataArr.some(review  => {
    // console.log('review: ', review);
    // console.log('currentUser: ', currentUser)
    //   console.log("boolean check : ", (review.userId === currentUser.id))
      return (review.userId === currentUser.id);
  })


  const formattedDate = (timeStamp) => {
    return new Date(timeStamp).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="all-reviews-Container">
      {doesSpotHaveReviews() ? (
        reviewsDataArr?.map((review) => (
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
          <div>Reviews coming soon</div>
      )}
      <div>
            {(isLoggedIn() && (!isSpotOwner() && !hasReview())) ? (
                <button>Post a review</button>
            ) : <div>Cannot post a review</div>}
    </div>
    </div>
  );
};

export default Reviews;
