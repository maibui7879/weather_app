import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "543a785a19ce440e8c275559251103";
const FORECAST_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}`;

const WeeklyWeather = ({ city }) => {
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchWeeklyWeather = async () => {
      try {
        const res = await axios.get(`${FORECAST_URL}&q=${city}&days=7`);
        setWeeklyData(res.data.forecast.forecastday);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu dự báo thời tiết", error);
      }
    };

    fetchWeeklyWeather();
  }, [city]);

  const daysInVietnamese = {
    Sunday: "Chủ Nhật",
    Monday: "Thứ Hai",
    Tuesday: "Thứ Ba",
    Wednesday: "Thứ Tư",
    Thursday: "Thứ Năm",
    Friday: "Thứ Sáu",
    Saturday: "Thứ Bảy",
  };

  return (
    <div className="w-full">
      <div className="mt-2 bg-black bg-opacity-50 p-4 rounded-lg text-white mx-4 ">
        <div className="flex flex-col">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-2 border-b border-gray-600">
              <p className="w-1/4">
                {daysInVietnamese[new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })]}
              </p>
              <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-12 h-12" />
              <p className="w-1/4 text-center font-bold">{day.day.avgtemp_c}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyWeather;
