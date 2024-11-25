import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import "./css/MyReviews.css"; // 스타일링 파일

function MyReviews() {
  const [reviews, setReviews] = useState([]); // 사용자 리뷰 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // 리뷰 데이터 가져오기
    axiosInstance
      .get("/doori/myreviews")
      .then((response) => {
        console.log(response.data);
        setReviews(response.data); // 리뷰 상태 업데이트
        setLoading(false);
      })
      .catch((error) => {
        console.error("리뷰 정보를 가져오는 중 오류가 발생했습니다: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (reviews.length === 0) {
    return <div className="noReviewsMessage">작성한 리뷰가 없습니다.</div>;
  }

  return (
    <div className="myReviews">
      <h2>내가 작성한 리뷰</h2>
      <ul className="reviewList">
        {reviews.map((review) => (
          <li key={review.id} className="reviewItem">
            <div className="movieInfo">
              <h3 className="movieTitle">{review.movieId.title}</h3>
              <p className="reviewDate">
                작성일: {new Date(review.createDate).toLocaleDateString()}
              </p>
            </div>
            <div className="reviewContent">
              <p className="rating">평점: {review.reviewScope} / 5</p>
              <p className="content">{review.reviewContent}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyReviews;
