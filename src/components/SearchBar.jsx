import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) onSearch(lastCity);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      localStorage.setItem("lastCity", city);
      setCity(""); // Clear input field after search
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full p-4 bg-black bg-opacity-40 backdrop-blur-lg transition-all duration-300 ease-in-out" style={{ height: "80px" }}>
      <form
        onSubmit={handleSubmit}
        className={`fixed right-4 rounded-lg transition-all duration-300 ease-in-out ${
          scrollY > 50 ? (isFocused ? "w-[40%] border-gray-500" : "w-[40%] border-white") : "w-[60%]"
        } h-[70px]`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
      >
        <div className="relative w-full text-white">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Nhập thành phố (không dấu)"
            className={`relative w-full text-white px-3 py-2 pr-10 border-2 rounded rounded-2xl bg-transparent placeholder-gray-200 focus:outline-none ${
              isFocused ? "border-gray-500" : "border-white"
            }`}
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
