'use client';
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from 'react';
import TrackItem from "@/app/components/trackitem";
import nProgress from "nprogress";
import Loading from "./loading";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use Next.js v13+ router hooks

const CACHE_EXPIRATION_TIME = 60000; // 1 minute in milliseconds

const SearchPage = () => {
    const [tracks, setTracks] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const offset = parseInt(searchParams.get('offset'));
    const pathname = usePathname(); // Track the current pathname

    // Cache key for session storage
    const cacheKey = `${query}-${offset}`;

    useEffect(() => {
        fetchData();
    }, [query, offset]); // Trigger fetch when query or offset changes

    // Clear cached data when navigating away from search page
    useEffect(() => {
        if (!pathname.includes('/search')) {
            sessionStorage.removeItem(cacheKey);
        }
    }, [pathname]);

    const fetchData = async () => {
        if (!query) return;

        const cachedData = sessionStorage.getItem(cacheKey);

        // Check if cached data exists
        if (cachedData) {
            const { data } = JSON.parse(cachedData);

                setTracks(data.tracks);
                setTotalResults(data.totalResults);
                setNextPageUrl(data.nextPageUrl);
                setPrevPageUrl(data.prevPageUrl);
                setError(null);
                return; // Skip fetching new data if cache is still valid
        }

        // Fetch new data if no valid cache exists
        nProgress.start();
        setLoading(true);

        try {
            const response = await fetch('/api/trackSearch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, offset })
            });
            const data = await response.json();

            setTracks(data.data.tracks.items);
            setTotalResults(data.data.tracks.total);
            setNextPageUrl(data.data.tracks.next);
            setPrevPageUrl(data.data.tracks.previous);
            setError(null);

            // Cache the fetched data with the current timestamp
            sessionStorage.setItem(
                cacheKey,
                JSON.stringify({
                    data: {
                        tracks: data.data.tracks.items,
                        totalResults: data.data.tracks.total,
                        nextPageUrl: data.data.tracks.next,
                        prevPageUrl: data.data.tracks.previous,
                    }
                })
            );

            // Set a timer to automatically clear the cache after 2.5 minutes (150,000 ms)
            setTimeout(() => {
                sessionStorage.removeItem(cacheKey);
            }, CACHE_EXPIRATION_TIME);
        } catch (error) {
            setTracks(null);
            setError('Search Failed.');
        } finally {
            nProgress.done();
            setLoading(false);
        }
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
