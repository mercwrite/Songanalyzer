'use client';
import { useSearchParams } from "next/navigation";
import {useState, useEffect, Suspense} from 'react';
import TrackItem from "@/app/components/trackitem";
import nProgress from "nprogress";



const SearchPage = () => {
    const [tracks, setTracks] = useState([]);
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [currentQuery, setCurrentQuery] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if(currentQuery != query){
            setCurrentQuery(query);
        }

    }, [query]);

    useEffect(() => {

        const fetchData = async () => {
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
    

        if(currentQuery != ''){
            fetchData();
        }
    }, [currentQuery]);

    return(
        <div className="absolute flex-col flex-initial top-10 justify-center w-full items-center">
        <h1 className="text-white text-4xl text-left mx-5 mb-4">
            Search results for &ldquo;{query}&rdquo;
        </h1>
        <div className="flex flex-col space-y-4 w-full justify-center mx-auto px-4">
            {tracks != null && tracks.map((track) => (
                <TrackItem key={track.id} track={track} />
            ))}
        </div>
    </div>
    );
}

export default function Search (){
    return(
        <Suspense>
            <SearchPage/>
        </Suspense>
    );
}

