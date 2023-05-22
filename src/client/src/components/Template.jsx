import React, { useEffect } from "react";
import SelectContainer from "./SelectContainer";
import { useState } from "react";
import { movies, slots, seats } from "./data.js";
import axios from "axios";
import LastBookingDetails from "./LastBookingDetails";
import Spinner from "../styles/bootstrap.min.css";
import Alert from 'react-bootstrap/Alert';

export default function Template(props) {
  const [state, setState] = useState({
    movie: "",
    timeSlots: "",
    seats: {
      a1: 0,
      a2: 0,
      a3: 0,
      a4: 0,
      d1: 0,
      d2: 0
    },
    // isLoading: false,
    lastBooking: null,
    showSuccessAlert: false,
  });

  useEffect(() =>{
    //get api data
    setState.isLoading = true;
    axios.get('/api/bookings')
    .then((res) =>{
    let { movie, slot, seats } = res.data.data;
    // console.log(movie, slot, seats)

    setState({
      ...state,
      movie: movie,
      timeSlots: slot,
      seats: {
        a1: seats.A1 ? seats.A1 : 0,
        a2: seats.A2 ? seats.A2 : 0,
        a3: seats.A3 ? seats.A3 : 0,
        a4: seats.A4 ? seats.A4 : 0,
        d1: seats.D1 ? seats.D1 : 0,
        d2: seats.D2 ? seats.D2 : 0
      },
      // isLoading: false

    })
    }
  )
  .catch((error) => {
setState.isLoading = false
    console.log(error);
  });}
  , [])

  const movieSelectHandler = (item) => {
    setState((preState) => ({
      ...preState,
      movie: item,
    }));
  };

  const timeSlotSelectHandler = (item) => {
    //update state
    setState((preState) => ({
      ...preState, //copy
      timeSlots: item,
    }));
  };
  // console.log(state)

  const seatSelectHandler = (e) => {
    // console.log(e.target, 'hello')

    setState({
      ...state,
      seats: {
        ...state.seats,
        [e.target.name]: e.target.value,
      },
    });
  };

  const submitBooking = (e) => {
    // console.log(e.target, 'im in')
    console.log({
      movie: state.movie,
      slot: state.timeSlots,
      seats: state.seats,
    });
    axios
      .post("/api/bookings", {
        movie: state.movie,
        slot: state.timeSlots,
        seats: {
          A1: Number(state.seats.a1),
          A2: Number(state.seats.a2),
          A3: Number(state.seats.a3),
          A4: Number(state.seats.a4),
          D1: Number(state.seats.d1),
          D2: Number(state.seats.d2),
        },
      }
      )

      .then((res) => {
        if(res.status === 200){
          setState({
            showSuccessAlert: true
          });
        }
      else{
        setState({
          showSuccessAlert: false
        });
      }
        console.log(res, "hiii");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    {state.showSuccessAlert &&
        <Alert variant="success" onclick= {()=> setState({showSuccessAlert:false})} dismissible>
          Booking successful!
        </Alert>
      }
      {/* heading */}
      <div className="m-5">
        <h3>Book that Show !!</h3>
      </div>


      <div className="container-fluid">
        <div className="row gx-5">
          <div className="col-md-8">
            <SelectContainer
              mainheading="Select a Movie"
              items={movies}
              selectedValue={state.movie}
              onclick={movieSelectHandler}
            />
            <SelectContainer
              mainheading="Select A Time Slot"
              items={slots}
              selectedValue={state.timeSlots}
              onclick={timeSlotSelectHandler}
            />
            <SelectContainer
              mainheading="Select A Seats"
              type="number"
              items={seats}
              seats={state.seats}
              selectedValue={state.seats}
              onchange={seatSelectHandler}
            />
          </div>
          <div className="col-md-4">
            <LastBookingDetails
              movieName={state.movie}
              timing={state.timeSlots}
              seat={state.seats}
            />
          </div>
        </div>
        <div style={{ margin: "10px 45px" }}>
          <button
            variant="success"
            onClick={(e) => submitBooking(e)}
            style={{
              background:
                "linear-gradient( 20deg,rgb(13 153 16), rgb(13 153 16) 55%, rgb(111 217 86), rgb(114 114 112) 35%)",
              fontWeight: 600,
            }}
          >
          
            {/* <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true" */}
        
            Book Now

          </button>
          
        </div>
      </div>
      
    </>
  );
}
