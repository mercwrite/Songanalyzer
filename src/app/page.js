'use client';

import { useState } from 'react';
import { useSearch } from './context/searchcontext';
import SongDisplay from './songdisplay';
import Link from 'next/link';

export default function Home() {


    return (
    <div>
       <div className="flex flex-col items-center justify-center h-screen pt-16 bg-graybg">
            <h1 className="text-6xl font-bold text-white">
                Welcome to Songanalyzer
            </h1>
            <p className="mt-4 text-lg text-spotify-placeholder">
                To get started, type a song in the search bar
            </p>
        </div>
    </div>
    );
}