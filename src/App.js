import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/weather';
export default function App() {
  
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=fe4feefa8543e06d4f3c66d92c61b69c`)
      .then(res => res.json())
      .then(weather => {
        setWeatherData(weather);
        console.log(weather);
      });
    }
    fetchData();
  }, [lat,long])
  
  return (
    <div className="App">
      {(typeof weatherData.main != 'undefined') ? (
       
        <Weather weatherData={weatherData}/>
        
      ): (
        <div><h1>Hello Worlsd</h1></div>
      )}
      
    </div>
  );
}