'use client';
import SongInput from './songinput';
import NavBar from './navbar';
import { useState, useEffect } from 'react';
import SongDisplay from './songdisplay';

export default function Home() {

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (query) => {
        setSearchQuery(query);
      };

    return (
    <div>
        <NavBar onSearch={handleSearch}/>
        <div className='p-5'>
            {searchQuery != '' && <SongDisplay songId={searchQuery}/>}
        </div>
    </div>
    );
}