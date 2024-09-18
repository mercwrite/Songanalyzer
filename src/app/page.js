// app/page.js
"use client"; // This is important to enable client-side rendering

import { useState } from 'react';

export default function Home() {
    const [artistId, setArtistId] = useState('');
    const [followersCount, setFollowersCount] = useState(null);
    const [error, setError] = useState(null);

    const handleGetFollowers = async () => {
        setError(null);
        setFollowersCount(null);

        try {
            const response = await fetch('/api/artist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ artistId }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch followers count');
            }

            const data = await response.json();
            setFollowersCount(data.followersCount);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <title>Spotify Followers</title>
            <h1>Spotify Artist Followers</h1>
            <input
                type="text"
                value={artistId}
                onChange={(e) => setArtistId(e.target.value)}
                placeholder="Enter Artist ID"
            />
            <button onClick={handleGetFollowers}>Get Followers</button>
            {followersCount !== null && <p>Total Followers: {followersCount}</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
}
