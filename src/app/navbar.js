'use client';
import react from "react";
import {useState, useEffect} from "react";

export default function NavBar({onSearch}){
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () =>{
        onSearch(searchQuery);
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSearch();  // Trigger search when Enter key is pressed
      }
    };
    return (
        <nav className=" bg-black p-4 flex justify-between items-center shadow-2xl">
          <div className="text-white text-2xl">Songanalyzer</div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter Song ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="shadow appearance-none border outline-gray-800 border-gray-800 rounded w-full py-2 px-3 text-white leading-tight bg-gray-800 transition ease-in-out hover:outline-gray-600 hover:bg-gray-700 focus:outline-white focus:outline-1 focus:transition-all duration-200"
            />
            <button
              onClick={handleSearch}
              className=" bg-black text-white px-4 py-2 rounded-md"
            >
              Search
            </button>
          </div>
        </nav>
      );
}