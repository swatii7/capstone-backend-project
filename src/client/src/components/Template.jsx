import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import LastBookingDetails from "./LastBookingDetails";
import SelectContainer from "./SelectContainer";
import { movies, seats, slots } from "./data.js";

// validation on negative numbers for seat input
function containesNegtiveVal(seats) {
  let hasNegativeValue = false;

  for (const seat in seats) {
    //check if the number is negative
    if (seats.hasOwnProperty(seat) && seats[seat] < 0) {
      hasNegativeValue = true;
      break;
    }
  }

  return hasNegativeValue;
}

export default function Template() {
  //state
  const [state, setState] = useState({
    movie: "",
    timeSlots: "",
    seats: {
      a1: 0,
      a2: 0,
      a3: 0,
      a4: 0,
      d1: 0,
      d2: 0,
    },
    isLoading: false,
    showSuccessAlert: false,
  });

  //other state for last booking
  const [lastBooking, setlastBooking] = useState({
    movie: "",
    timeSlots: "",
    dataPresent: false,
    iSfinishLoading: false, // state for last booking message
    seats: {
      a1: 0,
      a2: 0,
      a3: 0,
      a4: 0,
      d1: 0,
      d2: 0,
    },
    error: null,
  });

  useEffect(() => {
    //get api data
    setlastBooking({ iSfinishLoading: false });
    axios
      .get("/api/bookings")
      .then((res) => {
        console.log(res);
        if (typeof res.data.message === "string") {
          setlastBooking({
            ...lastBooking,
            error: res.data.message,
            iSfinishLoading: true,
            dataPresent: false,
          });
        } else if (res.data.data) {
          let { movie, slot, seats } = res.data.data;
          setlastBooking({
            ...lastBooking,
            movie: movie,
            timeSlots: slot,
            dataPresent: true,
            iSfinishLoading: true,
            seats: {
              a1: seats.A1 ? seats.A1 : 0,
              a2: seats.A2 ? seats.A2 : 0,
              a3: seats.A3 ? seats.A3 : 0,
              a4: seats.A4 ? seats.A4 : 0,
              d1: seats.D1 ? seats.D1 : 0,
              d2: seats.D2 ? seats.D2 : 0,
            },
            error: null,
          });
        } else {
          setlastBooking({
            ...lastBooking,
            dataPresent: false,
            iSfinishLoading: true,
          });
        }
      })
      .catch((error) => {
        setlastBooking({
          ...lastBooking,
          dataPresent: false,
          iSfinishLoading: true,
        });

        console.log(error);
      });
  }, []);

  console.log(lastBooking, "lastBooking");

  //set a loader to load the data in  previous bookings details by using setTimeout with useEffect hook
  useEffect(() => {
    if (!state.isLoading) return;
    // Set a timeout to hide the loader after 2 seconds
    const loaderTimeout = setTimeout(() => {
      setState({ isLoading: false });
    }, 2000);

    return () => {
      setState({ showSuccessAlert: true });
      clearTimeout(loaderTimeout); // Clean up the loader timeout when component unmounts
    };
  }, [state.isLoading]);

  useEffect(() => {
    if (!state.showSuccessAlert) return;
    // Set a timeout to hide the loader after 2 seconds
    const loaderTimeout = setTimeout(() => {
      setState({ showSuccessAlert: false });
    }, 2000);

    return () => {
      clearTimeout(loaderTimeout); // Clean up the loader timeout when component unmounts
    };
  }, [state.showSuccessAlert]);

  // set state of movie selector in a function
  const movieSelectHandler = (item) => {
    //update state
    setState((preState) => ({
      ...preState,
      movie: item,
    }));
  };

  // set state of time Slot in a function
  const timeSlotSelectHandler = (item) => {
    //update state
    setState((preState) => ({
      ...preState, //copy
      timeSlots: item,
    }));
  };

  //set state of seats in a function
  const seatSelectHandler = (e) => {
    setState({
      ...state,
      seats: {
        ...state.seats,
        [e.target.name]: e.target.value,
      },
    });
  };

  const submitBooking = (e) => {
    const { movie, timeSlots, seats } = state;
    // validation
    const notSelectedAnySeat = Object.values(seats).every(
      (field) => field === 0
    );  
    if (movie === "") {
      enqueueSnackbar("Please Select a movie", "error");
      return;
    } else if (timeSlots === "") {
      enqueueSnackbar("Please Select a time slot", "error");
      return;
    } else if (notSelectedAnySeat) {
      enqueueSnackbar("Please Select Atleast one seat", "error");
      return;
    } else if (containesNegtiveVal(seats)) {
      enqueueSnackbar("Invalid Seat Entered, Pelase re-Submit", "error");
      return;
    }

    //post request
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
      })

      .then((res) => {
        if (res.status === 200) {
          //set state in last bookings details
          setlastBooking({
            movie: state.movie,
            timeSlots: state.timeSlots,
            dataPresent: true,
            iSfinishLoading: true,
            seats: {
              a1: state.seats.a1,
              a2: state.seats.a2,
              a3: state.seats.a3,
              a4: state.seats.a4,
              d1: state.seats.d1,
              d2: state.seats.d2,
            },
          });
          setState({
            movie: "",
            timeSlots: "",
            dataPresent: false,
            isLoading: true,
            iSfinishLoading: false,
            seats: {
              a1: 0,
              a2: 0,
              a3: 0,
              a4: 0,
              d1: 0,
              d2: 0,
            },
            showSuccessAlert: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(lastBooking, lastBooking.error, "success");
  return (
    <>
      <SnackbarProvider />

      {state.showSuccessAlert && (
        <Alert
          variant="success"
          onClick={() => setState({ showSuccessAlert: false })}
        >
          Booking successful!
        </Alert>
      )}
      {/* heading */}
      <div className="m-5">
        <h3>Book that Show !!</h3>
      </div>

      <Row>
        <Col xs={12} md={8}>
          {/* movie selector container */}
          <SelectContainer
            mainheading="Select a Movie"
            items={movies}
            selectedValue={state.movie}
            onclick={movieSelectHandler}
          />
          {/* timeslots container */}
          <SelectContainer
            mainheading="Select A Time Slot"
            items={slots}
            selectedValue={state.timeSlots}
            onclick={timeSlotSelectHandler}
          />
          {/* seat container */}
          <SelectContainer
            mainheading="Select A Seats"
            type="number"
            items={seats}
            seats={state.seats}
            selectedValue={state.seats}
            onchange={seatSelectHandler}
          />
        </Col>
        <Col xs={12} md={4}>
          <LastBookingDetails
            movieName={lastBooking.movie}
            timing={lastBooking.timeSlots}
            seat={lastBooking.seats}
            lastBookingPresent={lastBooking.dataPresent}
            finishLoading={lastBooking.iSfinishLoading}
            errorMsg={lastBooking && lastBooking?.error}
          />
        </Col>

        <div style={{ margin: "10px 45px", position: "relative" }}>
          <button
            className="BookingButton"
            variant="success"
            onClick={submitBooking}
          >
            <span>{state.isLoading ? ` Submitting... ` : ` Book Now `}</span>
          </button>
          {state.isLoading ? (
            <Spinner
              className="spinnerWrapper"
              animation="border"
              variant="dark"
            />
          ) : null}
        </div>
      </Row>
    </>
  );
}
