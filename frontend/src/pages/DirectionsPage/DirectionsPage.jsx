import React from "react";
import picture from "./skydivepic.JPG"

function DirectionsPage() {
  return (
    <div className="d-flex justify-content-around" style={{marginTop: "10rem"}}>
      <div className="card" style={{ width: "18rem" }}>
        <img src={picture} class="card-img-top"  alt="frontend/skydivepic.JPG"/>
        <div className="card-body">
          <h5 className="card-title">Picture title</h5>
          <p className="card-text">
            Details about what ever picture you add to this card.
          </p>
          <a href="/" className="btn btn-primary">
            Back to Homepage
          </a>
          <a href="/" className="btn btn-primary" style={{margin:"1rem"}}>
            Add
          </a>
        </div>
      </div>
      <div class="card" style={{ width: "18rem" }}>
        <img class="card-img-top" src={picture} alt="frontend/skydivepic.JPG"/>
        <div class="card-body">
          <h5 class="card-title">Picture title</h5>
          <p class="card-text">
          Details about what ever picture you add to this card.
          </p>
          <a href="/" class="btn btn-primary">
            Back to Homepage
          </a>
          <a href="/" className="btn btn-primary" style={{margin:"1rem"}}>
            Add
          </a>
        </div>
      </div>
      <div class="card" style={{ width: "18rem" }}>
        <img class="card-img-top" src={picture} alt="frontend/skydivepic.JPG" />
        <div class="card-body">
          <h5 class="card-title">Picture title</h5>
          <p class="card-text">
          Details about what ever picture you add to this card.
          </p>
          <a href="/" class="btn btn-primary">
            Back to Homepage
          </a>
          <a href="/" className="btn btn-primary" style={{margin:"1rem"}}>
            Add
          </a>
        </div>
      </div>
    </div>
  );
}

export default DirectionsPage;
