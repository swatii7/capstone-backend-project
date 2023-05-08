import React, { useEffect } from 'react'
import SelectContainer from './SelectContainer';
import { useState } from 'react';
import {movies,slots, seats} from './data.js';
import axios from 'axios';
import LastBookingDetails from './LastBookingDetails';


export default function Template() {
 
  const [state, setState] = useState({
    movie: '',
    timeSlots: '',
    seats: {
      a1: '',
      a2: '',
      a3: '',
      a4: '',
      d1: '',
      d2: ''
    }
  })

  useEffect(() =>{
    //get api data
    axios.get('/api/bookings')
    .then((res) =>{
    let { movie, slot, seats } = res.data.data;
    console.log(movie, slot, seats)
  
    setState({
      ...state,
      movie: movie,
      timeSlots: slot

    })
    }
  )
  .catch((error) => {

    console.log(error);
  });}
  , [])
  console.log(state,'i am console state')

  const movieSelectHandler = (item) =>{
setState(preState => ({
  ...preState,
  movie:item
}))

  }

  

  const timeSlotSelectHandler = (item) =>{
    //update state 
setState(preState=> ({
  ...preState, //copy 
  timeSlots:item

}))
  }
  // console.log(state)

  
  const seatSelectHandler= (e) =>{
// console.log(e.target, 'hello')

setState({
  ...state,
  seats: {
    ...state.seats,
    [e.target.name]: e.target.value
  }
});
  }

  const submitBooking = (e) =>{
    // console.log(e.target, 'im in')
axios.post('/api/bookings', {movie: state.movie, slot: state.timeSlots, seats: state.seats})
.then(res =>{
  console.log(res, 'hiii');
})
.catch((error) => {

  console.log(error);
});

  }

  return (
    <>
    {/* heading */}
    <div className='m-5'>  
        <h3>Book that Show !!</h3>
    </div>

    <div className="container-fluid">
    <div className="row gx-5">
        <div className='col-md-8'>
        <SelectContainer mainheading="Select a Movie" items={movies} selectedValue= {state.movie} onclick = {movieSelectHandler}/>
        <SelectContainer mainheading="Select A Time Slot"  items={slots} selectedValue= {state.timeSlots} onclick= {timeSlotSelectHandler}  />
        <SelectContainer mainheading="Select A Seats" type = 'number' items={seats} seats = {state.seats} selectedValue= {state.seats} onchange = {seatSelectHandler} />
        </div>
        <div className='col-md-4' >
          <LastBookingDetails />
        </div>
      </div>
      <div style={{ margin: "10px 45px" }}>
      <button variant="success" onClick= {(e) => submitBooking(e)} style={{
   background:
    "linear-gradient( 20deg,rgb(13 153 16), rgb(13 153 16) 55%, rgb(111 217 86), rgb(114 114 112) 35%)",
  fontWeight: 600
}}>Book Now</button>
      </div>
      
    </div>

    </>
  )
}
