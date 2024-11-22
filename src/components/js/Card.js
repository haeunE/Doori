import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Card.css"


function Card(props) {
  const [selected, setSelected] = useState(false);

  const clickHandler = () => {
    if(props.selectNo === props.id) {
      props.setFilterMovieId();
      return;
    }
    props.setFilterMovieId(props.id)
    setSelected(!selected)
  }

  return (
      <li className={`cards__item ${props.selected ? 'cards--click--ture' : ''}`} onClick={clickHandler}>
        {/* 세로정렬 */}
        {
          !props.goto && 
            <Link className='cards__item__link' to={props.link}>
            
              <figure className='cards__item__pic-wrap'>
                <img
                  className='cards__item__img'
                  alt='image'
                  src={props.img}
                />
              </figure>
              
              <div className='cards__item__info'>
                <img  className='cards__item__icon' src={props.icon}/>
                <h5 className='cards__item__text'>{props.title}</h5>
                <p className="cards__item__some">{props.some}<br/>{props.num}</p>
              </div>
            </Link>
        }
        {/* 가로정렬 */}
        {
          props.goto && 
            <div className='cards__item__link'>
              <figure className='cards__item__pic-wrap'>
                <img
                className='cards__item__img'
                alt='image'
                src={props.img}
                />
              </figure>
            
              <div className='cards__item__info'>
                <img  className='cards__item__icon' src={props.icon}/>
                <h5 className='cards__item__text'>{props.title}</h5><br/>
              </div>
              <a className="cards__item__goto" href={props.link} target="_self">바로가기</a>
              
            </div>
          }
      </li>
  );
}

export default Card;