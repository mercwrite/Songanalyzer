'use client';
import SongStats from "./songstats";
import SongInfo from "./songinfo";
import { useEffect, useState } from "react";
import nProgress from "nprogress";
import { useRouter } from "next/navigation";

const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const modes = ["Minor", "Major"];

function millisecondsToMinutes(milliseconds) {
    let seconds = Math.round(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let remainder = Math.round(seconds % 60);
    let leadingZero = remainder < 10 ? '0' : '';

    return `${minutes.toString()}:${leadingZero}${remainder.toString()}`;
}

function cleanSongName(songName) {
    const patterns = [
        /\s*-\s*remastered\s*\d{0,4}/i,
        /\s*-\s*anniversary edition/i,
        /\s*-\s*live( at [\w\s]+)?/i,
        /\s*-\s*deluxe edition/i,
        /\s*-\s*radio edit/i,
        /\s*-\s*acoustic( version)?/i,
        /\s*-\s*extended( version)?/i,
        /\s*-\s*explicit/i,
        /\s*-\s*clean version/i,
        /\s*-\s*censored/i,
        /\s*-\s*alternate take/i,
        /\s*-\s*demo/i,
        /\s*\(\d{4} remaster\)/i
    ];

    return patterns.reduce((cleanedName, pattern) => cleanedName.replace(pattern, ''), songName).trim();
}

export default function SongDisplay(props) {
    const router = useRouter();
    const songId = props.songId;
    const [analysisData, setAnalysisData] = useState(null);
    const [trackData, setTrackData] = useState(null);
    const [error, setError] = useState(null);
    const [color, setColor] = useState('');
    const [lyricsUrl, setLyricsUrl] = useState(null);
    const [lyricsId, setLyricsId] = useState(null);

    const songName = trackData?.data?.name || '';
    const artists = trackData?.data?.artists || [];
    const album = trackData?.data?.album?.name || '';

    const key = analysisData ? keys[analysisData.data.key] : '';
    const bpm = analysisData ? Math.round(analysisData.data.tempo) : '';
    const duration = analysisData ? millisecondsToMinutes(analysisData.data.duration_ms) : '';
    const mode = analysisData ? modes[analysisData.data.mode] : '';

    const image = trackData?.data?.album?.images?.[0]?.url || '/images/noalbumimage.png';

    // Check for existing data in local storage
    useEffect(() => {
        const cachedAnalysisData = localStorage.getItem(`analysisData_${songId}`);
        const cachedTrackData = localStorage.getItem(`trackData_${songId}`);
        const cachedLyricsUrl = localStorage.getItem(`lyricsUrl_${songId}`);
        const cachedLyricsId = localStorage.getItem(`lyricsId_${songId}`);

        if (cachedAnalysisData && cachedTrackData) {
            setAnalysisData(JSON.parse(cachedAnalysisData));
            setTrackData(JSON.parse(cachedTrackData));
            setLyricsUrl(cachedLyricsUrl);
            setLyricsId(cachedLyricsId);
        } else {
            getInfo();
        }

        return () => {
            localStorage.removeItem(`analysisData_${songId}`);
            localStorage.removeItem(`trackData_${songId}`);
            localStorage.removeItem(`lyricsUrl_${songId}`);
            localStorage.removeItem(`lyricsId_${songId}`);
        };
    }, [songId]);

    async function getInfo() {
        nProgress.start();
        try {
            const analysisResponse = await fetch('/api/trackFeatures', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ songId }),
            });
            const analysisData = await analysisResponse.json();
            if (analysisData.data.error) {
                router.push('/song-not-found');
                return;
            }
            setAnalysisData(analysisData);
            localStorage.setItem(`analysisData_${songId}`, JSON.stringify(analysisData));

            const infoResponse = await fetch('/api/trackInfo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ songId }),
            });
            const trackData = await infoResponse.json();
            setTrackData(trackData);
            localStorage.setItem(`trackData_${songId}`, JSON.stringify(trackData));
        } catch (err) {
            setError('Failed to get track info');
            setTrackData(null);
            setAnalysisData(null);
            console.error(err);
            router.push("/song-not-found");
        } finally {
            nProgress.done();
        }
    }

    useEffect(() => {
        const fetchLyrics = async () => {
            try {
                const lyricsRes = await fetch(
                    `/api/lyrics?title=${encodeURIComponent(cleanSongName(songName))}&artist=${encodeURIComponent(artists[0]?.name || '')}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                const lyricsData = await lyricsRes.json();
                if (lyricsData.songUrl) {
                    setLyricsUrl(lyricsData.songUrl);
                    localStorage.setItem(`lyricsUrl_${songId}`, lyricsData.songUrl);
                }
                if (lyricsData.songId != null) {
                    setLyricsId(lyricsData.songId);
                    localStorage.setItem(`lyricsId_${songId}`, lyricsData.songId);
                }
                if (!lyricsData.songUrl && lyricsData.songId == null) {
                    setError('Lyrics not found');
                }
            } catch {
                setError("No data found");
            }
        };

        if (analysisData && trackData && lyricsId == null && analysisData.data.instrumentalness < 0.5) {
            fetchLyrics();
        }
    }, [analysisData, trackData, lyricsId, songId]);

    const handleColor = (bgcolor) => {
        setColor(bgcolor);
    };

    return (
        <div className="relative min-h-screen">
            {color && 
                <div
                    className="absolute top-13 left-0 w-full h-full z-0 pointer-events-none"
                    style={{
                        background: `linear-gradient(180deg, ${color} 0%, transparent 100%)`,
                    }}
                    key={color}
                />
            }

            <div className="relative top-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                    {analysisData && (
                        <SongStats songKey={key} bpm={bpm} duration={duration} mode={mode} />
                    )}
                </div>
                <div className="w-full">
                    {trackData && (
                        <SongInfo
                            img={image}
                            songUrl={trackData.data.external_urls.spotify}
                            lyricsId={lyricsId}
                            lyricsUrl={lyricsUrl}
                            songName={songName}
                            artists={artists}
                            album={album}
                            onColor={handleColor}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
