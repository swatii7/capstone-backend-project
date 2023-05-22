import React from 'react'

export default function LastBookingDetails(props) {
  console.log(props, 'xsxsxsxsxsxsxsaxsxsx')
  return (
 
        <div style={{  border: "1px solid black",
        borderRadius: "7px",
        padding: "12px",
        width: "310px",
        height: "auto" ,
        display:'grid'}}>
            <h4>Last Booking Details</h4>
           <div>
            <ul style={{listStyle: "none", display: "contents"}}>
                <li>Seats:</li>
                <li>A1: {props.seat && props.seat.a1 ? props.seat.a1 : 0} </li>
                <li>A2: {props.seat && props.seat.a2 ? props.seat.a2 : 0}</li>
                <li>A3: {props.seat && props.seat.a3 ? props.seat.a3 : 0}</li>
                <li>A4: {props.seat && props.seat.a4 ? props.seat.a4 : 0}</li>
                <li>D1: {props.seat && props.seat.d1 ? props.seat.d1 : 0}</li>
                <li>D2: {props.seat && props.seat.d2 ? props.seat.d2 : 0}</li>
                <li>Slot: {props.timing}</li>
                <li>Movie: {props.movieName}</li>

            </ul>
            
           </div>
            </div>
      
  
  )
}
