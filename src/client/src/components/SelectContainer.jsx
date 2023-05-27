import React from "react";

export default function SelectContainer(props) {

  const {mainheading, items, type, selectedValue, onclick, seats, onchange} = props;  //destructing props
  return (
    //grid container
    <div className="container-fluid">
      <div className="row gx-5">
        <div className="col">
          <div className="ContainerStyle">
            <h4>{mainheading}</h4>
            <div className="selectorWrapper">
            <div className="btn-group" role="group" aria-label="Basic outlined example">

              {items.map((item,index) => (
                <React.Fragment key={index}>
                  {type !== "number" ? (
                    //movie or slot button
                    <button
                      type="button"
                      className={
                        item === selectedValue
                          ? 'btn btn-secondary'
                          : 'btn btn-outline-secondary'
                      }
                      onClick={() => onclick(item)}
                      style={{ marginRight: "15px", marginBottom: "19px" , borderRadius: '7px'}}
                    >
                      {item}
                    </button>
                  ) : 
                  (
                    //seats 
                    <div className="seatWrapper"
                    >
                      <h5>{`Type ${item}`}</h5>
                      <input
                        className="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        type="number"
                        name={item.toLowerCase()}
                        value={seats && seats[item.toLowerCase()]}
                        onChange={(e) =>onchange(e)}
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
