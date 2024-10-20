'use client';
export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen pt-16 bg-graybg px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white text-center leading-tight">
            Welcome to Songanalyzer
        </h1>
        <p className="mt-4 text-xl md:text-lg text-spotify-placeholder text-center max-w-md">
            To get started, type a song in the search bar
        </p>
    </div>
    );
}