'use client';

import { useEffect, useState } from 'react';
import TrackItem from './trackitem';

const TopSongs = () => {
  const [topSongs, setTopSongs] = useState([]);
  const [error, setError] = useState(null);
  const cacheKey = "topSongs";

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const response = await fetch('/api/topTracks');
        if (!response.ok) {
          throw new Error('Failed to fetch top songs');
        }
        const data = await response.json();

        setTopSongs(data.data.tracks.items.slice(0, 10));
        sessionStorage.setItem(cacheKey, JSON.stringify(data.data.tracks));
      } catch (err) {
        setError(err.message);
      }
    };

    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setTopSongs(parsedData.items.slice(0, 10));
    } else {
      fetchTopSongs();
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-white text-2xl px-8 py-3">Top 10 Songs Today</h1>
      <div className='flex flex-col space-y-4 w-full justify-center mx-auto px-4 transition-all duration-300'>
        {topSongs.map((item) => (
          <TrackItem key={item.track} track={item.track} />
        ))}
      </div>
    </div>
  );
};

export default TopSongs;
