import '../css/Seat.css'

const Seat = ({ seatnumber, isReserved, isSelected, onClick }) => {
  return (
    <div
      className={`seat ${isReserved ? "reserved" : ""} ${isSelected ? "selected" : ""}`}
      onClick={!isReserved ? () =>  onClick(): null} 
    >
      {seatnumber}
    </div>
  );
};

export default Seat