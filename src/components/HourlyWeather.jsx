import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "543a785a19ce440e8c275559251103";
const FORECAST_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}`;

const HourlyWeather = ({ city }) => {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    const fetchHourlyWeather = async () => {
      try {
        const res = await axios.get(`${FORECAST_URL}&q=${city}&hours=5`);
        const currentHour = new Date().getHours();
        const filteredData = res.data.forecast.forecastday[0].hour
          .filter((hour) => hour.time_epoch >= res.data.location.localtime_epoch)
          .slice(0, 5);
        setHourlyData(filteredData);
      } catch (error) {
        console.error("Error fetching hourly weather data", error);
      }
    };

    fetchHourlyWeather();
  }, [city]);

  return (
    <div className="w-full">
    <div className=" mt-2 bg-black bg-opacity-50 p-4 py-6 rounded-lg text-white mx-4 ">
      <div className="flex justify-between">
        {hourlyData.map((hour, index) => (
          <div key={index} className="flex flex-col items-center text-sm">
            <p>{hour.time.split(" ")[1]}</p>
            <img src={hour.condition.icon} alt={hour.condition.text} className="w-8 h-8" />
            <p className="text-xs font-bold">{hour.temp_c}°C</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default HourlyWeather;
