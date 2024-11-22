import { useState } from "react";
import "../css/Cards.css";
import Card from "./Card"

function Cards({list,align, setFilterMovieId, filterMovieId}){
  // const [propsList, setPropslist] = useState([...props])
  const wrapperClass = `cards__wrapper ${align === "no-wrap" ? "cards--no-wrap" : ""}`;
  
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