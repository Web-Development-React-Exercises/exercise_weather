import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const URL = 'https://api.openweathermap.org/data/3.0/onecall' //?lat={lat}&lon={lon}&appid={API key}
const API_KEY = 'be67bd2de0f51b98cdfa4931c8f7457f'

export default function Weather({ lat, lon }) {
    const [temp, setTemp] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [direction, setDirection] = useState(0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        const address = URL +
            '?lat=' + lat +
            '&lon=' + lon +
            '&units=metric' +
            '&appid=' + API_KEY;

        console.log(address);

        axios.get(address)
            .then(response => {
                console.log(response)

                setTemp(response.data.current.temp);
                setSpeed(response.data.current.wind_speed);
                setDirection(response.data.current.wind_deg);
                setDescription(response.data.current.weather[0].description);
                setIcon('http://openweathermap.org/img/wn/' + response.data.current.weather[0].icon + '@2x.png');
            })
            .catch(error => {
                console.log(error);
            });
    }, [])


    return (
        <>
            <p>Temperature: {temp} °C</p>
            <p>Wind: {speed} m/s, {direction} degrees</p>
            <p>Description: {description}</p>
            <img src={icon} alt={'Image of ' + description} />
        </>
    )
}
