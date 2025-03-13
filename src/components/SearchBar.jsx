import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch, scrollY }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full p-4 bg-black bg-opacity-40 backdrop-blur-lg transition-all duration-300 ease-in-out"
      style={{ height: scrollY > 50 ? "60px" : "80px" }}
    >
<form
  onSubmit={handleSubmit}
  className={`fixed right-4 p-auto rounded-lg transition-all duration-300 ease-in-out ${
    scrollY > 50 ? "w-[80%] h-[50px]" : "w-[60%] h-[70px]"
  }`}
>

        <div className="relative w-full">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Nhập thành phố (không dấu)"
            className="w-full text-white px-3 py-2 pr-10 border-2 rounded rounded-2xl bg-transparent placeholder-gray-700 focus:outline-none"
          />
          <button type="submit" className="absolute inset-y-0 right-3 flex items-center text-white hover:text-gray-300">
            <FaSearch className="text-xl" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
