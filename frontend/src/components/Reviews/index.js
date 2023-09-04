import "./Reviews.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadReviewsThunk } from "../../store/reviews";
import OpenModalButton from '../OpenModalButton';
import CreateReview from "../CreateReview";
import DeleteReview from "../DeleteReview";

const Reviews = ({ spotId, owner }) => {
  const spotIdNum = Number(spotId);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.user);

  const reviewsDataObj = useSelector((state) => state.reviews.allReviews);

  const reviewsDataArr = Object.values(reviewsDataObj).sort(
    (a, b) => {
        const aTime = Date.parse(a.updatedAt);
        const bTime = Date.parse(b.updatedAt);
        return bTime - aTime
    }
  );


  useEffect(() => {
    dispatch(loadReviewsThunk(spotIdNum));
  }, [dispatch]);

  const doesSpotHaveReviews = () => reviewsDataArr.length ? true : false;
  const isLoggedIn = () => currentUser?.id ? true : false;


  const isSpotOwner = () => {
    return currentUser && owner && (currentUser.id === owner.id);
  }

  const hasReview = () => reviewsDataArr.some(review  => {
      return (review.userId === currentUser.id);
  })

  const theirReviewId = () => reviewsDataArr.find(review => review.userId === currentUser?.id)

  const formattedDate = (timeStamp) => {
    return new Date(timeStamp).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="all-reviews-Container">
    <div className="post-review-container">
        {(isLoggedIn() && (!isSpotOwner() && !hasReview())) ? (
            doesSpotHaveReviews() ? (
            <div className="post-review-button">
            <OpenModalButton buttonText={`Post Your Review`} modalComponent={<CreateReview spotIdNum={spotIdNum} />} />
            </div>
            ) : (
                <>
                <div className="post-review-button">
                <OpenModalButton buttonText={`Post Your Review`} modalComponent={<CreateReview spotIdNum={spotIdNum} />} />
                </div>
                <div className="no-reviews-text">
                    Be the first to post a review!
                </div>
                </>
            )
        ) : <div></div>}
    </div>
      {doesSpotHaveReviews() ? (
        reviewsDataArr?.map((review) => ( 
          <div className="each-review-container" key={review.id}>
            <div>
              <div className="review-firstName">{review.User?.firstName}</div>
            </div>
            <div>
              <div className="review-date">{formattedDate(review.updatedAt)}</div>
            </div>
            <div>
              <div className="review-text">{review.review}</div>
            </div>
            {(review.id === theirReviewId()?.id) ? (
                <div>
                    <div className="delete-review-container">
                        <OpenModalButton buttonText={`Delete`} modalComponent={<DeleteReview reviewId={review.id} spotId={spotIdNum} />} />
                    </div>
                </div>
            ) : <></> }
          </div>
        ))
      ) : (
          <div></div>
      )}
    </div>
  );
};

export default Reviews;
