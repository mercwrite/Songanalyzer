'use client';
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from 'react';
import TrackItem from "@/app/components/trackitem";
import nProgress from "nprogress";
import Loading from "./loading";
import Link from "next/link";

const SearchPage = () => {
    const [tracks, setTracks] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // New state to manage loading status

    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const offset = parseInt(searchParams.get('offset'));

    useEffect(() => {
        fetchData();
    }, [query, offset]);

    const fetchData = async (url = '/api/trackSearch') => {
        if (!query) return;
        
        nProgress.start();
        setLoading(true); // Start loading
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, offset })
        })
            .then((response) => response.json())
            .then((data) => {
                setTracks(data.data.tracks.items);
                setTotalResults(data.data.tracks.total);
                setNextPageUrl(data.data.tracks.next);
                setPrevPageUrl(data.data.tracks.previous);
                setError(null);
            })
            .catch(() => {
                setTracks(null);
                setError('Search Failed.');
            })
            .finally(() => {
                nProgress.done();
                setLoading(false); // Stop loading
            });
    };

    return (
        <div className="relative flex-col flex-initial top-10 justify-center w-full min-hscreen items-center">
            <h1 className="text-white text-4xl text-left mx-5 mb-4">
                Search results for &ldquo;{query}&rdquo;
            </h1>
            <p className="text-gray-400 text-sm mx-5 mb-6">
                Page {Math.floor(offset / 20) + 1}
            </p>
            <div 
                className={`flex flex-col space-y-4 w-full justify-center mx-auto px-4 transition-all duration-300 ${loading ? 'min-h-[400px]' : ''}`}
            >
                {tracks != null && tracks.map((track) => (
                    <TrackItem key={track.id} track={track} />
                ))}
            </div>

            {tracks && (
                <div className="flex justify-between w-full px-4 mt-6">
                    {prevPageUrl != null ?
                        <Link
                            href={`/search?q=${query}&offset=${offset - 20}`}
                            className="text-white transition ease-in-out hover:scale-105 duration-100"
                        >
                            &larr; Previous
                        </Link>
                        :
                        <div className="text-spotify-placeholder"> &larr; Previous</div>
                    }
                    {nextPageUrl != null ?
                        <Link
                            href={`/search?q=${query}&offset=${offset + 20}`}
                            className="text-white transition ease-in-out hover:scale-105 duration-100"
                        >
                            Next &rarr;
                        </Link>
                        :
                        <div className="text-spotify-placeholder"> Next &rarr; </div>
                    }
                </div>
            )}

            <div className="mb-12" /> {/* Extra spacing at the bottom */}

            {error && <p className="text-red-500 mx-5">{error}</p>}
        </div>
    );
};

export default function Search() {
    return (
        <Suspense fallback={<Loading />}>
            <SearchPage />
        </Suspense>
    );
}
