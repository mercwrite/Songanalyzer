import Link from "next/link";
import TopSongs from "./components/topsongs";

export const metadata = {
    title: "Songanalyzer",
    description: "Find the key, mode, BPM, and duration for any song on Spotify. Search over a catalog of 100M+ songs. Useful for DJs, Producers, and Composers. Learn more about your favorite songs on Songanalyzer.",
  };

export default function Home() {

    return (
    <>
        <div className="flex flex-col items-center justify-center h-screen pt-16 bg-graybg px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white text-center leading-tight">
                Welcome to Songanalyzer
            </h1>
            <p className="mt-4 text-xl md:text-lg text-spotify-placeholder text-center max-w-md">
                To get started, type a song in the search bar
            </p>
            <p className="mt-4 text-xl md:text-lg text-white text-center max-w-md">
                IMPORTANT NOTE: Unfortunately, as of November 27th, 2024, Spotify released an update
                to their API which deprecated some of the essential functions needed for Songanalyzer to function.
            </p>
            <p className="mt-4 text-xl md:text-lg text-white text-center max-w-md">
                For more information on the change made by Spotify, click the link below.
            </p>
            <Link href="https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api" className="text-white">
            https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api
            </Link>
        </div>
        <TopSongs/>
        <div className="mb-12" />
    </>
    );
}