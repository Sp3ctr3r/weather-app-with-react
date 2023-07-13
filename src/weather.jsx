import React, { useState, useEffect } from "react";
import './index.css';
import axios from "axios";

const Weather = () => {
    const [data, setData] = useState(null);
    const [location, setLocation] = useState("");

    useEffect(() => {
        if (location) {
            const fetchData = async () => {
                const url = `http://api.weatherstack.com/current?access_key=21f3aea4f8e1743e2edea1c41087c47a&query=${location}`;
                try {
                    const response = await axios.get(url);
                    setData(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [location]);

    const handleSearch = (event) => {
        if (event.key === "Enter") {
            setLocation(event.target.value);
        }
    };

    return (
        <div className="Container p-5 m-5">
            <div className="row justify-content-center">
                <div className="col-3">
                    <form className="form-inline">
                        <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Search City"
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </form>
                </div>
                <div className="col-1"></div>
                <div className="col-5"></div>
            </div>
            <div className="seperate"></div>
            <div className="row justify-content-center">
                <div className="col-2">
                    <p className="weatherStatus">{data && data.current && data.current.weather_descriptions && data.current.weather_descriptions[0]}</p>
                </div>
                <div className="col-2 ">
                    <p>Humidity: {data && data.current && data.current.humidity} %</p>
                    <hr />
                    <p>Temperature: {data && data.current && data.current.temperature}°</p>
                    <hr />
                    <p>Wind Speed: {data && data.current && data.current.wind_speed} MPH</p>
                </div>
                <div className="col-5"></div>
            </div>
        </div>
    );
}

export default Weather;
