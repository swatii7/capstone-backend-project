import React from "react";
// import Container from '../styles/bootstrap.min.css';
// import Row from '../styles/bootstrap.min.css';
// import Col from '../styles/bootstrap.min.css';
// import Button from '../styles/bootstrap.min.css';
// import Form from '../styles/bootstrap.min.css';

export default function SelectContainer(props) {
  return (
    <div className="container-fluid">
      <div className="row gx-5">
        <div className="col">
          <div
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h4>{props.mainheading}</h4>
            <div style={{ display: "flex", padding: "19px 0px" }}>
            <div className="btn-group" role="group" aria-label="Basic outlined example">

              {props.items.map((item,index) => (
                <React.Fragment key={index}>
                  {props.type !== "number" ? (
                    <button
                      type="button"
                      className={
                        item === props.selectedValue
                          ? 'btn btn-secondary'
                          : 'btn btn-outline-secondary'
                      }
                      onClick={() => props.onclick(item)}
                      style={{ marginRight: "15px", marginBottom: "19px" }}
                    >
                      {item}
                    </button>
                  ) : 
                  (
                    <div
                      style={{
                        border: "1px solid black",
                        margin: "0px 14px 0px 4px",
                        borderRadius: "8px",
                        padding: "10px 0px 10px 21px",
                        width: "116px",
                      }}
                    >
                      <h5>{`Type ${item}`}</h5>


                      <input
                        className="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        type="number"
                        name={item.toLowerCase()}
                        value={props.seats[item.toLowerCase()]}
                        onChange={(e) =>props.onchange(e)}
                        style={{ width: "77%" }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
