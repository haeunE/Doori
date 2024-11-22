import { useState, useEffect, useRef } from "react";
import axiosInstance from "../axiosInstance";
import "./css/MyReviews.css";
import Myreservation from "./Myreservation";

function MyReviews({ setIsAuth }) {
    const [review, setReview] = useState({ reviewScope: 0, content: "" });
    const [movie, setMovie] = useState(null);
    const [user, setUser] = useState({ username: sessionStorage.getItem("username") || "" });
    const [savedReview, setSavedReview] = useState(null);
    const starDrag = useRef(false);
    const starContainerRef = useRef(null);

    useEffect(() => {
        const username = sessionStorage.getItem("username");
        if (!username) {
            alert("로그인이 필요합니다.");
            setIsAuth(false);
            window.location.href = "/doori/login";
        } else {
            setUser({ username });
            setIsAuth(true);
        }
    }, [setIsAuth]);

    useEffect(() => {
        const movie_id = sessionStorage.getItem("movie_id");
        if (movie_id) {
            axiosInstance.get(`/doori/movies/${movie_id}`)
                .then(response => {
                    setMovie(response.data);
                })
                .catch(console.error);
        }
    }, []);

    const handleChange = (e) => setReview(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const saveReview = async (e) => {
        e.preventDefault();

        const { username } = user;
        const { id: movie_id } = movie || {};

        if (!username || !movie_id || !review.content) {
            return alert("정보가 부족합니다.");
        }

        try {
            const response = await axiosInstance.post("/doori/myreviews", { ...review, userId: username, movie_id });
            if (response.status === 200) {
                setSavedReview({ ...review, username: user.username });
                setReview({ reviewScope: 0, content: "" });
            } else {
                alert("등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("오류 발생:", error);
            alert("오류가 발생했습니다.");

        }
    };

    const handleStarInteraction = (e, index = null) => {
        if (index !== null) {
            setReview(prev => ({ ...prev, reviewScope: index + 1 }));
        } else if (starDrag.current && starContainerRef.current) {
            const rect = starContainerRef.current.getBoundingClientRect();
            const dragLimit = rect.width * 0.4;
            const score = Math.min(Math.max((e.clientX - rect.left) / dragLimit * 10, 0), 5);
            setReview(prev => ({ ...prev, reviewScope: Math.round(score * 2) / 2 }));
        }
    };



    const handleMouseDown = () => {
        starDrag.current = true;
        document.addEventListener("mousemove", handleStarInteraction);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseUp = () => {
        starDrag.current = false;
        document.removeEventListener("mousemove", handleStarInteraction);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    return (
        <div>
            <div className="review">
                <div className="movieCards">


                </div>

                {/* <div className="userId">
                <p>작성자: {user.username?.slice(0, 3)}***</p>
            </div> */}

                {savedReview ? (
                    <div className="saved-review">
                        <p>평점: {savedReview.reviewScope} / 5</p>
                        <p>관람평: {savedReview.content}</p>
                        <button>수정</button>
                        <button>삭제</button>
                    </div>
                ) : (
                    <>

                        <div
                            ref={starContainerRef}
                            className="big-star-wrapper"
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseUp}
                        >
                            {[1, 2, 3, 4, 5].map((starIndex) => {
                                const isHalfFilled = review.reviewScope >= starIndex - 0.5 && review.reviewScope < starIndex;
                                const isFullFilled = review.reviewScope >= starIndex;

                                return (
                                    <div
                                        key={starIndex}
                                        className={`big-star ${isFullFilled ? 'filled' : ''}`}
                                        onClick={() => handleStarInteraction(null, starIndex - 1)}
                                    >
                                        {isHalfFilled && <div className="half" />}
                                    </div>
                                );
                            })}
                            <span className="reviewScore">{review.reviewScope.toFixed(1)} / 5</span>
                        </div>


                        <textarea
                            name="content"
                            placeholder="내용"
                            value={review.content}
                            onChange={handleChange}
                        />
                        <button type="submit" onClick={saveReview}>작성완료</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default MyReviews;
