import { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import WeatherInfo from "../components/WeatherInfo";
import HourlyWeather from "../components/HourlyWeather";
import WeeklyWeather from "../components/WeeklyWeather";
const API_KEY = "543a785a19ce440e8c275559251103";
const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&lang=vi`;
const FORECAST_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&lang=vi`;

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [background, setBackground] = useState("/images/clear.png");
  const [scrollY, setScrollY] = useState(0);

  const fetchWeather = async (city) => {
    try {
      const res = await axios.get(`${API_URL}&q=${city}`);
      setWeather(res.data);
      updateBackground(res.data.current.condition.text.toLowerCase());
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  const updateBackground = (condition) => {
    if (condition.includes("mây") || condition.includes("ẩm") || condition.includes("âm u")) {
      setBackground("/images/cloudy.png");
    } else if (condition.includes("bão") || condition.includes("mưa")) {
      setBackground("/images/rainy.png");
    } else {
      setBackground("/images/clear.png");
    }
  };

  useEffect(() => {
    fetchWeather("auto:ip");

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col">
        <Helmet>
        <title>BeroWeather</title>
        <meta name="description" content="Dự báo thời tiết chính xác và chi tiết nhất." />
      </Helmet>
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10 flex-grow"
        style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
      ></div>

      <div className="relative z-10 flex flex-col items-center w-full px-4">
        <SearchBar onSearch={fetchWeather} className="w-full mt-8" />

        {weather && (
          <div
            className={`w-full flex flex-col items-start transition-all duration-300 ease-in-out ${
              scrollY > 50 ? "fixed top-1 left-0" : "absolute top-[100px] left-0 pl-8"
            }`}
            style={{
              transform: scrollY > 50 ? "scale(0.7)" : "scale(1)",
              opacity: scrollY > 100 ? 0.85 : 1,
            }}
          >
            <h1 className="text-5xl font-bold text-white">{weather.location.name}</h1>
            <p className="text-xl text-gray-200 flex items-center gap-2">
              <FaMapMarkerAlt /> {weather.location.country}
            </p>
          </div>
        )}

        <div className="mt-40 w-full min-h-screen flex flex-col items-center">
          {weather && (
            <>
              <WeatherCard data={weather} />
              <HourlyWeather city={weather.location.name} />
              <WeeklyWeather city={weather.location.name} /> 
              <WeatherInfo data={weather} />
            </>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Home;
