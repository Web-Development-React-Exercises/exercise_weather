import './App.css';
import { useState, useEffect } from "react";
import Weather from "./components/Weather";

function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          setIsLoading(false);
        }, (error) => {
          console.log(error);
        });
      } else {
        alert('Your browser does not support geolocation')
      }
    }
    , []);

  if (isLoading) {
    return <h3>Loading...</h3>
  } else {

    return (
      <>
        <h3>
          Your Location:
        </h3>
        <p>{lat.toFixed(3)}</p>
        <p>{lon.toFixed(3)}</p>

        <h3>
          Weather in your location:
        </h3>
        <Weather lat={lat} lon={lon} />
      </>
    );
  }
}

export default App;
