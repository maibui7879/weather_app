import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_KEY = "543a785a19ce440e8c275559251103";
const FORECAST_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=7&q=`;

const WeatherSummary = ({ city }) => {
  const [forecast, setForecast] = useState(null);
  const [current, setCurrent] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const slideRef = useRef(null);
  let touchStartX = 0;

  useEffect(() => {
    if (!city) return;
    axios
      .get(`${FORECAST_URL}${city}`)
      .then((res) => {
        setCurrent(res.data.current);
        setForecast(res.data.forecast.forecastday);
      })
      .catch((err) => console.error(err));
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setSlideIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!forecast || !current) return null;

  const tomorrow = forecast[1];
  const todayTemp = current.temp_c;
  const tomorrowTemp = tomorrow.day.avgtemp_c;
  const tempComparison =
    tomorrowTemp > todayTemp
      ? `Ngày mai sẽ nóng hơn hôm nay (${tomorrowTemp}°C so với ${todayTemp}°C).`
      : `Ngày mai sẽ mát hơn hôm nay (${tomorrowTemp}°C so với ${todayTemp}°C).`;

  const dryDay = forecast.find((day) => day.day.condition.text.toLowerCase() === "clear");
  const dryDayText = dryDay ? `Ngày khô tiếp theo: ${dryDay.date}` : "Không có ngày khô trong dự báo.";

  const uvIndex = current.uv;
  let uvAdvice = "Chỉ số UV thấp, an toàn khi ra ngoài.";
  if (uvIndex >= 3 && uvIndex < 6) uvAdvice = "Chỉ số UV trung bình, nên đeo kính râm và dùng kem chống nắng.";
  else if (uvIndex >= 6 && uvIndex < 8) uvAdvice = "Chỉ số UV cao, nên hạn chế ra ngoài lúc trưa.";
  else if (uvIndex >= 8) uvAdvice = "Chỉ số UV rất cao, nên tránh nắng và mặc đồ bảo vệ.";

  const slides = [
    { title: "Dự báo ngày mai", content: tempComparison },
    { title: "Ngày khô phía trước", content: dryDayText },
    { title: "Chỉ số UV", content: uvAdvice },
  ];

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) {
      setDirection(1);
      setSlideIndex((prev) => (prev + 1) % 3);
    }
    if (touchEndX - touchStartX > 50) {
      setDirection(-1);
      setSlideIndex((prev) => (prev - 1 + 3) % 3);
    }
  };

  return (
    <div className="w-full">
      <div
        className="mt-2 bg-black bg-opacity-50 py-6 rounded-lg text-white mx-4 text-center overflow-hidden "
        ref={slideRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          key={slideIndex}
          initial={{ x: direction * 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -direction * 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-2">{slides[slideIndex].title}</h2>
          <p className="text-gray-300 text-xs">{slides[slideIndex].content}</p>
        </motion.div>
        <div className="flex justify-center mt-4 space-x-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                index === slideIndex ? "bg-white w-2" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherSummary;
