import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import "../css/ReadReviews.css"
import { useParams } from "react-router-dom";

function ReadReviews(props){
    const [loading , setLoading] = useState(true)
    const [readReviews, setReadReviews] = useState([])
    console.log(props.where)
    
    const makeLink = `/doori/`+props.where+`/reviews`
    console.log(makeLink)
    useEffect(()=>{

        axiosInstance.get(makeLink)
        .then((response) => {
            if (response.status === 200) {
              console.log(response.data); // 서버에서 전달된 Map 데이터 확인
              setReadReviews(response.data); // movie 데이터 상태 업데이트
              setLoading(false); // 로딩 상태 해제
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              console.log("Reivew not found");
            } else {
              console.error("An error occurred:", error);
            }
        });
    },[makeLink])

    // const reviews =[{
    //     id : '01',
    //     title : "안녕",
    //     content : "dksjfksldkfsldfjslkdfjsldkfs",
    //     createdDate : "2024-11-12 21:00:00"
    // }]

    if (loading)
        return <div>로딩중</div>
    return(
        <div className="review-list">
            <ul>
                {readReviews.map(review => (
                    <li key={review.id} className="review-item">
                        <p className="all-big-star-wrapper">
                            {[1, 2, 3, 4, 5].map((starIndex) => (
                                <div
                                    key={starIndex}
                                    className={`all-big-star ${review.reviewScope >= starIndex ? 'filled' : ''}`}
                                ></div>
                            ))}
                        </p>
                        <p><strong>{review.reviewContent}</strong></p>
                        <p><strong>ID: </strong>{review.userId.username}</p>
                        <p><strong>Date:</strong> {new Date(review.createDate).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default ReadReviews;