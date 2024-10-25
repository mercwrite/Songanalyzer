'use client';
import { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';

// Create the SearchContext
const SearchContext = createContext();

// Custom hook to use the SearchContext
export const useSearch = () => useContext(SearchContext);

// Provider component to wrap the app and provide search state
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (query) => {
    //query.preventDefault();
    //setSearchQuery(query);
    if(query != ''){
      router.push(`/search?q=${query}&offset=0`);
    }
  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};