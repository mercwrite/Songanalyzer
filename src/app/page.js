'use client';

import { useState } from 'react';
import { useSearch } from './context/searchcontext';
import SongDisplay from './songdisplay';
import Link from 'next/link';

export default function Home() {

    const { searchQuery } = useSearch();

    return (
    <div>
        <div className="p-8"/>
        <div>
            {/*{searchQuery != '' && <SongDisplay key={searchQuery} songId={searchQuery}/>} */}
        </div>
    </div>
    );
}