

function MyReviews() {



    return (
        <div className="review">
            <input type="text" name="title" placeholder="제목을 입력하세요." onChange={''}>제목</input>
            <input type="range">평점</input>
            <input type="text" name="content" placeholder="내용을 입력하세요." onChange={''}>내용</input>
            <button type="submit" name="submit" >작성완료</button>
        </div>
    )
}

export default MyReviews;