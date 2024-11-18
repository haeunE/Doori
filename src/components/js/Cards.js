import { useState } from "react";
import "../css/Cards.css";
import Card from "./Card"

function Cards({list}){
  // const [propsList, setPropslist] = useState([...props])
  console.log(...list)
  
  return (
    <div className="cards__container">
      <div className="cards__wrapper">
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
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Cards;