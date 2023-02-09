import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherPage = (props) => {
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([])
  const [weathercode, setWeathercode] = useState([])
//   const [conditions, setConditions] = useState("")
  
// fetchWeather();
  useEffect(() => { 
    
    fetchWeather();
  }, []); 


  async function fetchWeather() {
    console.log("coords:", props.lat, props.lng);
    let response = await axios.get(
      //   `https://api.weather.gov/points/${props.lat},${props.lng}`
      `https://api.open-meteo.com/v1/forecast?latitude=${props.lat}&longitude=${props.lng}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,rain,weathercode,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m,windgusts_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`
    );
    // console.log("Weather Data", response.data);     
    setWeather(response.data.current_weather);
    setForecast(response.data);    
    
    if (response.data.current_weather.weathercode === 0){
        setWeathercode("Clear Sky")}
    else if (response.data.current_weather.weathercode === 1){
        setWeathercode("Mainly Clear")
    }else if (response.data.current_weather.weathercode === 2){
        setWeathercode("Partly Cloudy")
    }else if (response.data.current_weather.weathercode === 3){
        setWeathercode("Overcast")
    }else if (response.data.current_weather.weathercode === 45){
        setWeathercode("Fog")
    }else if  (response.data.current_weather.weathercode === 48){
        setWeathercode("Depositing Rime Fog")
    }else if (response.data.current_weather.weathercode === 51){
        setWeathercode("Light Drizzle")
    }else if (response.data.current_weather.weathercode === 53){
        setWeathercode("Moderate Drizzle")
    }else if (response.data.current_weather.weathercode === 55){
        setWeathercode("Heavy Drizzle")
    }else if (response.data.current_weather.weathercode === 56){
        setWeathercode("Light Freezing Drizzle")
    }else if (response.data.current_weather.weathercode === 57){
        setWeathercode("Heavy Freezing Drizzle")
    }else if (response.data.current_weather.weathercode === 61){
        setWeathercode("Light Rain")
    }else if (response.data.current_weather.weathercode === 63){
        setWeathercode("Moderate Rain")
    }else if (response.data.current_weather.weathercode === 65){
        setWeathercode("Heavy Rain")
    }else if (response.data.current_weather.weathercode === 66){
        setWeathercode("Light Freezing Rain")
    }else if (response.data.current_weather.weathercode === 67){
        setWeathercode("Heavy Freezing Rain")
    }else if (response.data.current_weather.weathercode === 71){
        setWeathercode("Light Snow")
    }else if (response.data.current_weather.weathercode === 73){
        setWeathercode("Moderate Snow")
    }else if (response.data.current_weather.weathercode === 75){
        setWeathercode("Heavy Snow")
    }else if (response.data.current_weather.weathercode === 77){
        setWeathercode("Snow Grains")
    }else if (response.data.current_weather.weathercode === 80){
        setWeathercode("Slight Rain Showers")
    }else if (response.data.current_weather.weathercode === 81){
        setWeathercode("Moderate Rain Showers")
    }else if (response.data.current_weather.weathercode === 82){
        setWeathercode("Heavy Rain Showers")
    }else if (response.data.current_weather.weathercode === 85){
        setWeathercode("Light Snow Showers")
    }else if (response.data.current_weather.weathercode === 86){
        setWeathercode("Heavy Snow Showers")
    }else if (response.data.current_weather.weathercode === 95){
        setWeathercode("Thunderstorms")
    }else if (response.data.current_weather.weathercode === 96){
        setWeathercode("Thunderstorms with Light Hail")
    }else {
        setWeathercode("Thunderstorms with Heavy Hail")
    }      
    
  }  
     
  return (
    <div className="background-img">
      <h1 className="font-link title">Current Weather</h1>
      <div className="searched-chart">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="font-link">Current Temp.</th>
              <th className="font-link">Current Time</th>
              <th className="font-link">Conditions</th>
              <th className="font-link">Wind Direction</th>
              <th className="font-link">Wind Speed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{weather.temperature}</td>
              <td>{weather.time}</td>
              <td>{weathercode}</td>
              <td>{weather.winddirection}</td>
              <td>{weather.windspeed}</td>             
            </tr>
          </tbody>
        </table>
      </div>
      <h1 className="font-link title">Seven Day Look-Ahead</h1>
      <div className="searched-chart">
        <h4>{forecast.daily?.time[0]}</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="font-link">Rain (inches)</th>
              <th className="font-link">Sunrise/Sunset</th>
              <th className="font-link">High</th>
              <th className="font-link">Low</th>
              <th className="font-link">Wind Direction</th>
              <th className="font-link">Wind Gusts</th>
              <th className="font-link">Wind Speed</th>
            </tr>
          </thead>          
          <tbody>          
            <tr>                
              <td>{forecast.daily?.precipitation_sum[0]} in.</td>
              <td>{forecast.daily?.sunrise[0]}/{forecast.daily?.sunset[0]}</td>
              <td>{forecast.daily?.temperature_2m_max[0]}</td>
              <td>{forecast.daily?.temperature_2m_min[0]}</td>
              <td>{forecast.daily?.winddirection_10m_dominant[0]}</td>
              <td>{forecast.daily?.windgusts_10m_max[0]}mph</td>
              <td>{forecast.daily?.windspeed_10m_max[0]}mph</td>
            </tr>
            </tbody>
            <h4>{forecast.daily?.time[1]}</h4>
            <thead>
            <tr>
              <th className="font-link">Rain (inches)</th>
              <th className="font-link">Sunrise/Sunset</th>
              <th className="font-link">High</th>
              <th className="font-link">Low</th>
              <th className="font-link">Wind Direction</th>
              <th className="font-link">Wind Gusts</th>
              <th className="font-link">Wind Speed</th>
            </tr>
          </thead>          
          <tbody>
            <tr>
              <td>{forecast.daily?.precipitation_sum[1]} in.</td>
              <td>{forecast.daily?.sunrise[1]}/{forecast.daily?.sunset[1]}</td>
              <td>{forecast.daily?.temperature_2m_max[1]}</td>
              <td>{forecast.daily?.temperature_2m_min[1]}</td>
              <td>{forecast.daily?.winddirection_10m_dominant[1]}</td>
              <td>{forecast.daily?.windgusts_10m_max[1]}mph</td>
              <td>{forecast.daily?.windspeed_10m_max[1]}mph</td>
            </tr>
          </tbody>
          <h4>{forecast.daily?.time[2]}</h4>
            <thead>
            <tr>
              <th className="font-link">Rain (inches)</th>
              <th className="font-link">Sunrise/Sunset</th>
              <th className="font-link">High</th>
              <th className="font-link">Low</th>
              <th className="font-link">Wind Direction</th>
              <th className="font-link">Wind Gusts</th>
              <th className="font-link">Wind Speed</th>
            </tr>
          </thead>          
          <tbody>
            <tr>
              <td>{forecast.daily?.precipitation_sum[2]} in.</td>
              <td>{forecast.daily?.sunrise[2]}/{forecast.daily?.sunset[2]}</td>
              <td>{forecast.daily?.temperature_2m_max[2]}</td>
              <td>{forecast.daily?.temperature_2m_min[2]}</td>
              <td>{forecast.daily?.winddirection_10m_dominant[2]}</td>
              <td>{forecast.daily?.windgusts_10m_max[2]}mph</td>
              <td>{forecast.daily?.windspeed_10m_max[2]}mph</td>
            </tr>
          </tbody>
          <h4>{forecast.daily?.time[3]}</h4>
            <thead>
            <tr>
              <th className="font-link">Rain (inches)</th>
              <th className="font-link">Sunrise/Sunset</th>
              <th className="font-link">High</th>
              <th className="font-link">Low</th>
              <th className="font-link">Wind Direction</th>
              <th className="font-link">Wind Gusts</th>
              <th className="font-link">Wind Speed</th>
            </tr>
          </thead>          
          <tbody>
            <tr>
              <td>{forecast.daily?.precipitation_sum[3]} in.</td>
              <td>{forecast.daily?.sunrise[3]}/{forecast.daily?.sunset[3]}</td>
              <td>{forecast.daily?.temperature_2m_max[3]}</td>
              <td>{forecast.daily?.temperature_2m_min[3]}</td>
              <td>{forecast.daily?.winddirection_10m_dominant[3]}</td>
              <td>{forecast.daily?.windgusts_10m_max[3]}mph</td>
              <td>{forecast.daily?.windspeed_10m_max[3]}mph</td>
            </tr>
          </tbody>
          <h4>{forecast.daily?.time[4]}</h4>
            <thead>
            <tr>
              <th className="font-link">Rain (inches)</th>
              <th className="font-link">Sunrise/Sunset</th>
              <th className="font-link">High</th>
              <th className="font-link">Low</th>
              <th className="font-link">Wind Direction</th>
              <th className="font-link">Wind Gusts</th>
              <th className="font-link">Wind Speed</th>
            </tr>
          </thead>          
          <tbody>
            <tr>
              <td>{forecast.daily?.precipitation_sum[4]} in.</td>
              <td>{forecast.daily?.sunrise[4]}/{forecast.daily?.sunset[4]}</td>
              <td>{forecast.daily?.temperature_2m_max[4]}</td>
              <td>{forecast.daily?.temperature_2m_min[4]}</td>
              <td>{forecast.daily?.winddirection_10m_dominant[4]}</td>
              <td>{forecast.daily?.windgusts_10m_max[4]}mph</td>
              <td>{forecast.daily?.windspeed_10m_max[4]}mph</td>
            </tr>
          </tbody>
          <h4>{forecast.daily?.time[5]}</h4>
            <thead>
            <tr>
              <th className="font-link">Rain (inches)</th>
              <th className="font-link">Sunrise/Sunset</th>
              <th className="font-link">High</th>
              <th className="font-link">Low</th>
              <th className="font-link">Wind Direction</th>
              <th className="font-link">Wind Gusts</th>
              <th className="font-link">Wind Speed</th>
            </tr>
          </thead>          
          <tbody>
            <tr>
              <td>{forecast.daily?.precipitation_sum[5]} in.</td>
              <td>{forecast.daily?.sunrise[5]}/{forecast.daily?.sunset[5]}</td>
              <td>{forecast.daily?.temperature_2m_max[5]}</td>
              <td>{forecast.daily?.temperature_2m_min[5]}</td>
              <td>{forecast.daily?.winddirection_10m_dominant[5]}</td>
              <td>{forecast.daily?.windgusts_10m_max[5]}mph</td>
              <td>{forecast.daily?.windspeed_10m_max[5]}mph</td>
            </tr>
          </tbody>
          <h4>{forecast.daily?.time[6]}</h4>
            <thead>
            <tr>
              <th className="font-link">Rain (inches)</th>
              <th className="font-link">Sunrise/Sunset</th>
              <th className="font-link">High</th>
              <th className="font-link">Low</th>
              <th className="font-link">Wind Direction</th>
              <th className="font-link">Wind Gusts</th>
              <th className="font-link">Wind Speed</th>
            </tr>
          </thead>          
          <tbody>
            <tr>
              <td>{forecast.daily?.precipitation_sum[6]} in.</td>
              <td>{forecast.daily?.sunrise[6]}/{forecast.daily?.sunset[6]}</td>
              <td>{forecast.daily?.temperature_2m_max[6]}</td>
              <td>{forecast.daily?.temperature_2m_min[6]}</td>
              <td>{forecast.daily?.winddirection_10m_dominant[6]}</td>
              <td>{forecast.daily?.windgusts_10m_max[6]}mph</td>
              <td>{forecast.daily?.windspeed_10m_max[6]}mph</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherPage;
