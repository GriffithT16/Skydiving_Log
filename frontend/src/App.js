// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';


// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MapPage from "./pages/MapPage/MapPage";
import DirectionsPage from "./pages/DirectionsPage/DirectionsPage";
// import TestPage from "./pages/DirectionsPage/TestPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import JumpForm from "./components/JumpForm/JumpForm";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import WeatherPage from "./pages/WeatherPage/WeatherPage";
import ViewJumps from "./pages/ViewJumps/ViewJumps";

function App() {
  const [lat, setLat] = useState(5);
  const [lng, setLng] = useState(5);
  const [status, setStatus] = useState(null);
  const [weather, setWeather] = useState([]);
  const [locations, setLocations] = useState([]);
  const [latA, setLatA] = useState(5);
  const [lngA, setLngA] = useState(5);
  const [latB, setLatB] = useState(5);
  const [lngB, setLngB] = useState(5);
  const [latC, setLatC] = useState(5);
  const [lngC, setLngC] = useState(5);
  const [latD, setLatD] = useState(5);
  const [lngD, setLngD] = useState(5);
  const [latE, setLatE] = useState(5);
  const [lngE, setLngE] = useState(5);

  useEffect(() => {
  //  ! console.log("API KEY", process.env.REACT_APP_API_KEY);
    getLocation();
    fetchLocations();
  }, []);

  function getLocation() {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
      console.log("status", status)
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(fetchWeather);
    }
  }

  async function fetchWeather(latlng) {
    let response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latlng.coords.latitude}&longitude=${latlng.coords.longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m,windgusts_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`
    );
    setWeather(response.data.current_weather);
    setLat(latlng.coords.latitude);
    setLng(latlng.coords.longitude);
  }

  async function fetchLocations() {
    let response = await axios.get("http://127.0.0.1:8000/api/jump/locations/");
    setLocations(response.data);
    setLatA(response.data.results[0].geometry.location.lat);
    setLngA(response.data.results[0].geometry.location.lng);
    setLatB(response.data.results[1].geometry.location.lat);
    setLngB(response.data.results[1].geometry.location.lng);
    setLatC(response.data.results[2].geometry.location.lat);
    setLngC(response.data.results[2].geometry.location.lng);
    setLatD(response.data.results[3].geometry.location.lat);
    setLngD(response.data.results[3].geometry.location.lng);
    setLatE(response.data.results[4].geometry.location.lat);
    setLngE(response.data.results[4].geometry.location.lng);
    console.log(response.data);
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jumps" element={<JumpForm weather={weather} DirectionsPage={DirectionsPage} />} />
        <Route
          path="/weather"
          element={
            <WeatherPage lat={lat} lng={lng} getLocation={getLocation} />
          }
        />
        <Route
          path="/map"
          element={
            <MapPage
              library={["places"]}
              lat={lat}
              lng={lng}
              getLocation={getLocation}
              locations={locations}
              latA={latA}
              lngA={lngA}
              latB={latB}
              lngB={lngB}
              latC={latC}
              lngC={lngC}
              latD={latD}
              lngD={lngD}
              latE={latE}
              lngE={lngE}
            />
          }
        />
        <Route
          path="/log"
          element={<ViewJumps lat={lat} lng={lng} getLocation={getLocation} weather={weather}/>}
        />
        <Route
          path="/directions"
          element={
            <DirectionsPage lat={lat} lng={lng} getLocation={getLocation} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;


