import { FaTemperatureLow, FaTint, FaWind, FaCompass, FaTachometerAlt, FaSun, FaCloudRain, FaEye, FaThermometer } from "react-icons/fa";

const WeatherInfo = ({ data }) => {
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

  return (
    
    <div className="w-full min-h-screen flex-grow mt-4 px-4 md:px-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4">
      {info.map((item, index) => (
        <div key={index} className="p-6 py-10 bg-black bg-opacity-50 rounded rounded-2xl md:rounded-lg shadow text-left flex items-center text-white">
          
          <div>
            <div className="text-2xl mr-4 mb-4">{item.icon}</div>
            <p className="text-gray-400">{item.label}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherInfo;
