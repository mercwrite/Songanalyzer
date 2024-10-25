'use client';
import { useState } from "react";
import Image from "next/image";
import { useSearch } from "../context/searchcontext";
import Link from "next/link";

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
        <nav className="sticky top-0 left-0 right-0 backdrop-filter backdrop-blur-lg bg-opacity-90 firefox:bg-opacity-90 bg-black shadow-2xl p-2 flex justify-between items-center max-h-16 z-50">
          <Link
          href="/"
          className="relative w-fit h-16 pr-2 pl-1"
          >
          <div className="text-white max-sm:hidden text-2xl relative top-4 float-left">Songanalyzer</div>
          <Image src="/images/scouterlogo.png"
          width={48}
          height={48}
          alt="logo"
          className="relative float-right flex-shrink-0 top-3"/>
          </Link>
          <div className="flex items-center space-x-1">
            <div className="relative flex">
              <input
                type="text"
                placeholder="Search for a song..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="transition ease-in-out shadow appearance-none border placeholder:text-spotify-placeholder outline-spotify-bg border-spotify-bg rounded-3xl flex-initial w-full py-2 px-3 pr-2 text-white leading-tight bg-spotify-bg hover:outline-spotify-hover hover:bg-spotify-hover focus:outline-white focus:outline-1 focus:transition-all duration-300"
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
              className=" bg-transparent transition ease-in-out duration-150 text-white px-2 py-2 rounded-md hover:scale-105"
            >
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </div>
        </nav>
      );
}
