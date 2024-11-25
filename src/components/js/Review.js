import React, { useState, useRef } from 'react';
import '../css/Review.css'; // CSS 파일 직접 import

const Review = ({ movieId, timetableId, onSubmit,onClose, color }) => {
  const [rating, setRating] = useState(0); // 별점
  const [review, setReview] = useState(''); // 관람평
  const [reviewScope, setReviewScope] = useState(0); // 임시 별점
  const starContainerRef = useRef(null);
  const starDrag = useRef(false);

  const handleStarInteraction = (e, index = null) => {
    if (index !== null) {
      setReviewScope(index + 1); // 별점 클릭
      setRating(index + 1);
    } else if (starDrag.current && starContainerRef.current) {
      const rect = starContainerRef.current.getBoundingClientRect();
      const score = Math.min(Math.max((e.clientX - rect.left) / rect.width * 5, 0), 5);
      setReviewScope(Math.round(score * 2) / 2); // 드래그 시 임시 별점
    }
  };

  const handleMouseDown = () => {
    starDrag.current = true;
    document.addEventListener('mousemove', handleStarInteraction);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    starDrag.current = false;
    document.removeEventListener('mousemove', handleStarInteraction);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && review) {
      onSubmit({ movieId, timetableId, rating, review });
      setRating(0);
      setReview('');
      setReviewScope(0);
    } else {
      alert('별점과 관람평을 모두 입력해 주세요.');
    }
  };

  return (
    <div className="movieReview">
      <div className="closeButton" onClick={onClose}>×</div> {/* X 버튼 추가 */}
      <form onSubmit={handleSubmit}>
        <div className="rating">
          <div
            ref={starContainerRef}
            className="big-star-wrapper"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseUp}
          >
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <div
                key={starIndex}
                className={`big-star ${reviewScope >= starIndex ? 'filled' : ''}`}
                onClick={() => handleStarInteraction(null, starIndex - 1)}
              ></div>
            ))}
            <span className="reviewScore" color={color? color:"black"}>{reviewScope.toFixed(1)} / 5</span>
          </div>
        </div>

        <div className="review">
          <textarea
            placeholder="관람평을 작성해주세요."
            value={review}
            onChange={handleReviewChange}
            rows="5"
            className="reviewTextArea"
          />
        </div>

        <button type="submit" className="reviewButton">
          제출
        </button>
      </form>
    </div>
  );
};

export default Review;
