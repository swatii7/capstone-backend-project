import React from "react";

export default function LastBookingDetails(props) {
  const { finishLoading, lastBookingPresent, seat, timing, movieName } = props;   //destructing props
  return (
    <div className="LastBooking">
      <h4>Last Booking Details</h4>

{/* condition is impose if there is no any booking found then gives a message of no previous booking found */}
      {finishLoading && lastBookingPresent === false && (
        <div>
          <h3>No Previous Booking Found...!!</h3>
        </div>
      )}

      {lastBookingPresent && finishLoading && (
        <div>
          <ul style={{ listStyle: "none", display: "contents" }}>
            <li>Seats:</li>
            <li>A1: {seat && seat.a1 ? seat.a1 : 0} </li>
            <li>A2: {seat && seat.a2 ? seat.a2 : 0}</li>
            <li>A3: {seat && seat.a3 ? seat.a3 : 0}</li>
            <li>A4: {seat && seat.a4 ? seat.a4 : 0}</li>
            <li>D1: {seat && seat.d1 ? seat.d1 : 0}</li>
            <li>D2: {seat && seat.d2 ? seat.d2 : 0}</li>
            <li>Slot: {timing}</li>
            <li>Movie: {movieName}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
