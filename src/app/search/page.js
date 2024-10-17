'use client';
import { useSearchParams } from "next/navigation";
import {useState, useEffect} from 'react';
import TrackItem from "@/app/trackitem";
import nProgress from "nprogress";

const SearchPage = () => {
    const [tracks, setTracks] = useState([]);
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [currentQuery, setCurrentQuery] = useState('');
    const [error, setError] = useState(null);

    async function fetchData () {
        nProgress.start();
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
        nProgress.done();
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
        <div className="absolute top-24 left-10 right-10">
            <h1
            className="text-white text-4xl"
            >Search results for "{query}"</h1>
            <div className="p-2"></div>
            <ul className="object-contain md:object-scale-down space-y-2">
                {tracks != null && tracks.map((track) => (
                    <TrackItem track={track}/>
                ))}
            </ul>
        </div>
    )
}

export default SearchPage;