import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import axios from "axios";

const containerStyle = {
  width: "800px",
  height: "590px",
};



function MapPage(props) {
  const center = {
    lat: props.lat,
    lng: props.lng,
  };



  const onLoadMarker = (marker) => {};

  useEffect(() => {
    fetchLocations();
  }, []);

  const [autocomplete, setAutoComplete] = useState(null);
  const [latitude, setLatitude] = useState(5);
  const [longitude, setLongitude] = useState(5);
  const [address, setAddress] = useState();
  const [dz, setDz] = useState(null);

  const position = {
    lat: latitude,
    lng: longitude,
  };

  const nearby = {
    lat: props.latA,
    lng: props.lngA,
  };
  const nearbyb = {
    lat: props.latB,
    lng: props.lngB,
  };
  const nearbyc = {
    lat: props.latC,
    lng: props.lngC,
  };
  const nearbyd = {
    lat: props.latD,
    lng: props.lngD,
  };
  const nearbye = {
    lat: props.latE,
    lng: props.lngE,
  };
  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 10000,
    zIndex: 1
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: props.library,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    map.setZoom(7);
    setMap(map);
    console.log("COORDS", props.lat, props.lng, latitude, longitude);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onLoadAutoComplete = (autocomplete) => {
    setAutoComplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      console.log(autocomplete.getPlace());
      //   debugger;
      setAddress(autocomplete.getPlace());
      let address = autocomplete.getPlace();
      console.log("Actual Address", address.adr_address);
      setLatitude(address.geometry.location.lat);
      setLongitude(address.geometry.location.lng);
      console.log("COORDS", props.lat, props.lng, latitude, longitude);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  async function fetchLocations() {
    let response = await axios.get("http://127.0.0.1:8000/api/jump/locations/");

    console.log(response.data);
  }

  return isLoaded ? (
    <div className="backgroun">
      <div
        style={{
          left: "50%",
          marginLeft: "-400px",
          position: "absolute",
          marginTop: "1.5rem",
        }}
      >
        <GoogleMap
          id="marker-example"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={9}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={props.onMapClick}
          style={{
            boxShadow: "10px 5px 5px #764134",
            borderRadius: ".75em",
            opacity: "50%",
          }}
        >
          <Autocomplete
            onLoad={onLoadAutoComplete}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Enter Search Term..."
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px",
              }}
            />
          </Autocomplete>
          {/* Searched Place Marker */}
          <Marker
            onLoad={onLoadMarker}
            position={position}
            onPlaceChanged={onPlaceChanged}
          />
          <Marker
            onLoad={onLoadMarker}
            position={nearby}
            onPlaceChanged={onPlaceChanged}
          />
          <Marker
            onLoad={onLoadMarker}
            position={nearbyb}
            onPlaceChanged={onPlaceChanged}
          />
          <Marker
            onLoad={onLoadMarker}
            position={nearbyc}
            onPlaceChanged={onPlaceChanged}
          />
          <Marker
            onLoad={onLoadMarker}
            position={nearbyd}
            onPlaceChanged={onPlaceChanged}
          />
          <Marker
            onLoad={onLoadMarker}
            position={nearbye}
            onPlaceChanged={onPlaceChanged}
          />
          {/* Current Location Marker */}
          <Marker
            onLoad={onLoadMarker}
            position={center}
            onPlaceChanged={onPlaceChanged}
          />
          <Circle
            onLoad={onLoadMarker}
            onUnmount={onUnmount}            
            center={center}          
            options={options}
          />
          {/* <DirectionsRenderer directions={this.state.directions} /> */}
        </GoogleMap>
        <div style={{ position: "absolute" }}>
          <h4>
            <a href={address?.website}>{address?.name}</a>
          </h4>
          <p>{address?.formatted_address}</p>
          <p>{address?.formatted_phone_number}</p>
          <p>{address?.current_opening_hours?.weekday_text[0]}</p>
          <p>{address?.current_opening_hours?.weekday_text[1]}</p>
          <p>{address?.current_opening_hours?.weekday_text[2]}</p>
          <p>{address?.current_opening_hours?.weekday_text[3]}</p>
          <p>{address?.current_opening_hours?.weekday_text[4]}</p>
          <p>{address?.current_opening_hours?.weekday_text[5]}</p>
          <p>{address?.current_opening_hours?.weekday_text[6]}</p>
          <div>
            <h4>{props.locations.results[0].name}</h4>
            <p>{props.locations.results[0].formatted_address}</p>
            <h4>{props.locations.results[1].name}</h4>
            <p>{props.locations.results[1].formatted_address}</p>
            <h4>{props.locations.results[2].name}</h4>
            <p>{props.locations.results[2].formatted_address}</p>
            <h4>{props.locations.results[3].name}</h4>
            <p>{props.locations.results[3].formatted_address}</p>
            <h4>{props.locations.results[4].name}</h4>
            <p>{props.locations.results[4].formatted_address}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MapPage);
