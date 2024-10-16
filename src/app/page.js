'use client';
import NavBar from './navbar';
import { useState } from 'react';
import SongDisplay from './songdisplay';

export default function Home() {

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (query) => {
        setSearchQuery(query);
      };

    return (
    <div>
        <NavBar onSearch={handleSearch}/>
        <div className="p-8"/>
        <div>
            {searchQuery != '' && <SongDisplay key={searchQuery} songId={searchQuery}/>}
        </div>
    </div>
    );
}