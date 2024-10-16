'use client';
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {useState, useEffect} from 'react';

const SearchPage = () => {
    const [tracks, setTracks] = useState([]);
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [currentQuery, setCurrentQuery] = useState('');
    const [error, setError] = useState(null);

    async function fetchData () {
            fetch('/api/trackSearch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query})
        }).then((response) =>{
            return response.json();
        }).then((data) => {
            setTracks(data.data.tracks.items);
            setError(null);
        }).catch(() =>{
            setTracks(null);
            setError("Search Failed.");
        });
    }

    useEffect(() => {
        if(currentQuery != query){
            setCurrentQuery(query);
        }

    }, [query]);

    useEffect(() => {
        if(currentQuery != ''){
            fetchData();
        }
    }, [currentQuery]);

    return(
        <div className="p-8">
            <h1>Search Results for "{query}"</h1>
            <ul>
                {tracks != null && tracks.map((track) => (
                <li key={track.id}>
                    <Link href={`/track/${track.id}`}>
                    {track.name} by {track.artists.map((artist) => artist.name).join(', ')}
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchPage;