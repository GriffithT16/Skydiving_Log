import React from "react";
import picture from "./skydivepic.JPG";

function DirectionsPage() {
  return (
    <div
      className="d-flex justify-content-around"
      style={{ marginTop: "10rem" }}
    >
      <div>
        <div class="mb-4 d-flex justify-content-center">
          <img
            src={picture}
            alt="example placeholder"
            style={{ width: "300px" }}
          />
        </div>
        <div class="d-flex justify-content-center">
          <div class="btn btn-primary btn-rounded">
            <label class="form-label text-white m-1" for="customFile1">
              Choose file
            </label>
            <input type="file" class="form-control d-none" id="customFile1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectionsPage;
