import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Card.css"


function Card(props) {
  return (
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.link}>
        
          <figure className='cards__item__pic-wrap'>
            <img
              className='cards__item__img'
              alt='image'
              src={props.img}
            />
          </figure>
          
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.title}</h5>
          </div>
        </Link>
      </li>
  );
}

export default Card;