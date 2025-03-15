import { useState } from "react";

const WeatherCard = ({ data }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  return (
    
    <div className="w-full">
      <div className="mt-32 bg-black bg-opacity-50 px-4 py-6 rounded-lg text-white mx-4 flex justify-between">
      
      <div className="flex items-center">
        
        <div className="mr-4">
        <div className="flex items-center">
        <p className="text-5xl font-semibold">
          {isCelsius ? `${data.current.temp_c}` : `${data.current.temp_f}`}
        </p>
        <div className="flex flex-col text-left">
          <button 
            className="px-1 pb-3 rounded-md font-bold  text-left"
            onClick={() => setIsCelsius(!isCelsius)}
          >
            {isCelsius ? "°C" : "°F"}
          </button>
          
        </div>
        
      </div>
      <p className=" font-bold mt-2">{data.current.condition.text}</p> 
        </div>

      </div>

      <div className="text-right text-sm flex flex-col h-full justify-between gap-y-5">
        <p className="mb-auto text-base">{data.location.localtime}</p>
        <div>
          <p>Độ ẩm: {data.current.humidity}%</p>
          <p>Gió: {data.current.wind_kph} km/h</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WeatherCard;
