'use client';
import { useState } from "react";
import Image from "next/image";
import { useSearch } from "./context/searchcontext";

export default function NavBar(){
    const [searchQuery, setSearchQuery] = useState('');

    const { handleSearch } = useSearch();

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSearch(searchQuery);  // Trigger search when Enter key is pressed
      }
    };

    const clearSearch = () => {
      setSearchQuery('');  // Clear the search query
    };

    return (
        <nav className=" fixed top-0 left-0 right-0 bg-black shadow-2xl p-3 flex justify-between items-center z-50">
          <div className="text-white text-2xl">Songanalyzer</div>
          <Image src="/images/scouterlogo.png"
          width={65}
          height={65}
          alt="logo"
          className="fixed left-40 top-1 p-2"/>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Song ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="transition ease-in-out shadow appearance-none border placeholder:text-spotify-placeholder outline-spotify-bg border-spotify-bg rounded-3xl w-full py-2 px-3 pr-10 text-white leading-tight bg-spotify-bg hover:outline-spotify-hover hover:bg-spotify-hover focus:outline-white focus:outline-1 focus:transition-all duration-300"
              />
              {searchQuery && (
              <button
              onClick={clearSearch}
              className="transition ease-in-out absolute right-3 top-1 size-5 text-spotify-placeholder hover:text-white"
              >
              &times;
              </button>
              )}
            </div>
            <button
              onClick={() => handleSearch(searchQuery)}
              className=" bg-black text-white px-4 py-2 rounded-md"
            >
              Search
            </button>
          </div>
        </nav>
      );
}