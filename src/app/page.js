'use client';

import { useState } from 'react';
import { useSearch } from './context/searchContext';
import SongDisplay from './songdisplay';

export default function Home() {

    const { searchQuery } = useSearch();

    return (
    <div>
        <div className="p-8"/>
        <div>
            {searchQuery != '' && <SongDisplay key={searchQuery} songId={searchQuery}/>}
        </div>
    </div>
    );
}