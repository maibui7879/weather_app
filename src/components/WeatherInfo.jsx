import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTemperatureLow,
  FaTint,
  FaWind,
  FaCompass,
  FaTachometerAlt,
  FaSun,
  FaCloudRain,
  FaEye,
  FaThermometer,
} from "react-icons/fa";

const WeatherInfo = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const info = [
    { label: "Nhiệt độ cảm nhận", value: `${data.current.feelslike_c}°C`, icon: <FaTemperatureLow /> },
    { label: "Độ ẩm", value: `${data.current.humidity}%`, icon: <FaTint /> },
    { label: "Tốc độ gió", value: `${data.current.wind_kph} km/h`, icon: <FaWind /> },
    { label: "Hướng gió", value: `${data.current.wind_dir}`, icon: <FaCompass /> },
    { label: "Áp suất", value: `${data.current.pressure_mb} mb`, icon: <FaTachometerAlt /> },
    { label: "Chỉ số UV", value: `${data.current.uv}`, icon: <FaSun /> },
    { label: "Lượng mưa", value: `${data.current.precip_mm} mm`, icon: <FaCloudRain /> },
    { label: "Tầm nhìn", value: `${data.current.vis_km} km`, icon: <FaEye /> },
    { label: "Điểm sương", value: `${data.current.dewpoint_c}°C`, icon: <FaThermometer /> },
  ];

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen flex-grow mt-4 px-4 md:px-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4">
      {info.map((item, index) => (
        <motion.div
          key={index}
          className={`p-6 py-10 bg-black bg-opacity-50 rounded-2xl shadow text-left flex items-center text-white cursor-pointer overflow-hidden`}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1, width: expandedIndex === index ? "100%" : "100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          layout
          onClick={() => handleToggle(index)}
          onMouseEnter={() => setExpandedIndex(index)}
          onMouseLeave={() => setExpandedIndex(null)}
        >
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col items-start"
          >
            <motion.div
              animate={{ fontSize: expandedIndex === index ? "2rem" : "1.5rem" }}
              transition={{ duration: 0.3 }}
              className="text-2xl mb-4"
            >
              {item.icon}
            </motion.div>
            <p className="text-gray-400">{item.label}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default WeatherInfo;
