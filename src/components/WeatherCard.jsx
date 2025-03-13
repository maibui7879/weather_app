import { useState } from "react";

const WeatherCard = ({ data }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  return (
    <div className="w-full md:w-max p-6 rounded-lg flex justify-between items-center text-white">
      
      <div className="flex items-center">
        
        <div className="mr-4">
        <div className="flex items-center">
        <p className="text-3xl font-semibold">
          {isCelsius ? `${data.current.temp_c}` : `${data.current.temp_f}`}
        </p>
        <div className="flex flex-col text-left">
          <button 
            className="px-2 rounded-md font-bold  text-left"
            onClick={() => setIsCelsius(!isCelsius)}
          >
            {isCelsius ? "°C" : "°F"}
          </button>
          
        </div>
        
      </div>
      <p className=" font-bold mt-2">{data.current.condition.text}</p> 
        </div>

      </div>

      <div className="text-right">
        <p className="font-bold">{data.location.localtime}</p>
        <p>Độ ẩm: {data.current.humidity}%</p>
        <p>Gió: {data.current.wind_kph} km/h</p>
      </div>
    </div>
  );
};

export default WeatherCard;
