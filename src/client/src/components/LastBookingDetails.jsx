import React from "react";

export default function LastBookingDetails(props) {
  const { finishLoading, lastBookingPresent, seat, timing, movieName ,errorMsg} = props;   //destructing prop0s
  console.log(errorMsg,'errorMsg')
  return (
    <div className="LastBooking">
      <h4>Last Booking Details</h4>

      {/* Check if there are any previous bookings */}
            {finishLoading && lastBookingPresent === false && errorMsg &&  (
        <div>
          <h3 className="error_msg">{`${errorMsg}`}</h3>   {/* Display a message when no previous booking is found */}
        </div>
      )}
{/* when last booking data is present and data fetching is finish*/}
      {lastBookingPresent && finishLoading && (
        <div>
          <ul style={{ listStyle: "none", display: "contents" }}>
            <li className="heading_details">Seats:</li>
            <li><span className="booking_seat_sp">A1:</span>  {seat && seat.a1 ? <span className="seat_b">{seat.a1}</span> : '--'} </li>
            <li><span className="booking_seat_sp">A2:</span>  {seat && seat.a2 ? <span className="seat_b">{seat.a2}</span> : '--'}</li>
            <li><span className="booking_seat_sp">A3:</span>  {seat && seat.a3 ? <span className="seat_b">{seat.a3}</span> : '--'}</li>
            <li><span className="booking_seat_sp">A4:</span>  {seat && seat.a4 ? <span className="seat_b">{seat.a4}</span> : '--'}</li>
            <li><span className="booking_seat_sp">D1:</span>  {seat && seat.d1 ? <span className="seat_b">{seat.d1}</span> : '--'}</li>
            <li><span className="booking_seat_sp">D2:</span>  {seat && seat.d2 ? <span className="seat_b">{seat.d2}</span> : '--'}</li>
            <li><span className="heading_details">Slot:</span>  <span className="seat_b">{timing}</span></li>
            <li><span className="heading_details ">Movie:</span> <span className="name_movie">{movieName}</span></li>
          </ul>
        </div>
      )}
    </div>
  );
}
