import { useState } from "react";
import "../css/Cards.css";
import Card from "./Card"

function Cards({list,align, setFilterMovieId, filterMovieId}){
  // const [propsList, setPropslist] = useState([...props])
  const wrapperClass = `cards__wrapper ${align === "no-wrap" ? "cards--no-wrap" : ""}`;

  // useEffect(() => {
  //   // 선택된 카드로 스크롤
  //   if (selectedIndex !== -1 && cardRefs.current[selectedIndex]) {
  //     cardRefs.current[selectedIndex].scrollIntoView({
  //       behavior: "smooth", // 부드러운 스크롤
  //       block: "nearest", // 세로 중앙 위치
  //       inline: "center", // 가로 중앙 위치
  //     });
  //   }
  // }, [filterMovieId]); // filterMovieId가 변경될 때마다 실행

  return (
    <div className="cards__container">
      <div className={wrapperClass}>
        <ul className="cards__items">
          {list.map((item, i) => (
            <Card
              key={i}
              img={item.img}
              title={item.title}
              link={item.link}
              icon= {item.icon}
              num = {item.num}
              some = {item.some}
              goto = {item.goto}
              no={i}
              selected = {filterMovieId === item.id ? true : ''}
              selectNo={filterMovieId}
              id = {item.id}
              setFilterMovieId={setFilterMovieId}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Cards;