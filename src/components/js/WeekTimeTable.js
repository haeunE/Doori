import '../css/WeekTimeTable.css';

function WeekTimeTable () {
  return(
    <>
      <div><p className="Week_Movietimetitle">Doori 독립영화관 시간표</p>
          <th className="Week_subtitle"><p>안녕하세요, Doori 독립영화관 입니다.</p></th> 
      </div>
      
      <table className="Week_a"> 
        <tr className="Week_graphrow">
          <th>11월</th>
          <th>월(18)</th>
          <th>화(19)</th>
          <th>수(20)</th>
          <th>목(21)</th>
          <th>금(22)</th>
          <th>토(23)</th>
          <th>일(24)</th>
        </tr>
        <tr>
        <th><p>11:00</p><p>오전 11시</p></th>
          <td>-</td>
          <td rowSpan="2">오아시스<br />132분</td>
          <td>자유의 언덕<br />66분</td>
          <td>한공주<br />112분</td>
          <td>미씽: 사라진 여자<br />112분</td>
          <td>초코송이<br />89분</td>
          <td>소공녀<br />90분</td>
        </tr>
        <tr>
          <th><p>13:00</p><p>오후 1시</p></th>
          <td rowSpan="2">벌새<br />138분</td>
          <td>레드 핸드<br />99분</td>
          <td>밤의 해변에서 혼자<br />102분</td>
          <td colSpan="3">겨울 왕국<br />87분</td>
        </tr>
        <tr>
          <th><p>15:00</p><p>오후 3시</p></th>
          <td>이상한 나라의 앨리스<br />111분</td>
          <td colSpan="2">피크닉<br />91분</td>
          <td rowSpan="2">불한당: 나쁜 놈들의 세상<br />122분</td>
          <td colSpan="2">비밀은 없다<br />97분</td>
        </tr>
        <tr>
          <th><p>17:00</p><p>오후 5시</p></th>
          <td>비와 당신의 이야기<br />102분</td>
          <td>소녀<br />88분</td>
          <td>시라노: 연애조작단<br />113분</td>
          <td>블루 노트 레코드: 재즈의 전설들<br />85분</td>
          <td colSpan="2" rowSpan="2">Day Off</td>
        </tr>
        <tr>
          <th><p>19:00</p><p>오후 7시</p></th>
          <td colSpan="5">구름의 저편, 약속의 장소<br />93분</td>
        </tr>
        <tr>
          <th><p>21:00</p><p>오후 9시</p></th>
          <td colSpan="7">CLOSED<br /></td>
        </tr>
      </table>
      <ul className="Week_simple_text">
        <li>대관, 단체관람 가능합니다. 문의주세요</li>
        <li> 요금 성인 7000원 청소년/아동/노인 5000원</li>
      </ul> 
    </>
  );
}

export default WeekTimeTable;

