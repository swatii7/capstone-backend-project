import React from 'react'
// import Container from '../styles/bootstrap.min.css';
// import Row from '../styles/bootstrap.min.css';
// import Col from '../styles/bootstrap.min.css';
import SelectContainer from './SelectContainer';
import { useState } from 'react';
import {movies,slots, seats} from './data.js';


export default function Template() {
 
  const [state, setState] = useState({
    movie: '',
    timeSlots: '',
    seats: {
      a1:'',
      a2: '',
      a3: '',
      a4: '',
      d1: '',
      d2: ''
    }
  })

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
  console.log(state)

  
  const seatSelectHandler= (e) =>{
console.log(e.target, 'hello')

setState({
  ...state,
  seats: {
    ...state.seats,
    [e.target.name]: e.target.value
  }
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
        <div className='col-md-4' >2 of 2</div>
      </div>
      <div style={{ margin: "10px 45px" }}>
      <button variant="success" style={{
   background:
    "linear-gradient( 20deg,rgb(13 153 16), rgb(13 153 16) 55%, rgb(111 217 86), rgb(114 114 112) 35%)",
  fontWeight: 600
}}>Book Now</button>
      </div>
      
    </div>

    </>
  )
}
