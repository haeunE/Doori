import React, { useEffect, useState } from "react";
import "../css/WeekDays.css";
import SmallCard from "./SmallCard";
import axiosInstance from "../../axiosInstance";

const WeekDays = ({weekDays,selectedDate, setSelectedDate, }) => {
    // 오늘 날짜를 기준으로 일주일 데이터 생성
  const [hoveredIndex, setHoveredIndex] = useState(null); // 마우스오버된 버튼 인덱스
  
    return (
      <div className="weekdays__container">
        
        <div className="weekdays__items">
          <div className="weekdays__month">{selectedDate.month}월&nbsp;&nbsp;</div>
          {weekDays.map((day, index) => (
            <button
              key={index}
              className={`weekdays__button ${
                selectedDate.day === day.day ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedDate(day)
                
              }}
              onMouseEnter={() => setHoveredIndex(index)} // 마우스오버
              onMouseLeave={() => setHoveredIndex(null)} // 마우스아웃
            >
              {hoveredIndex === index ? day.weekday : day.day}
            </button>
          ))}
        </div>
        
      </div>
    );
  };

  
export default WeekDays;