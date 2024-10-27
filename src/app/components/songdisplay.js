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
    const [loaded, setLoaded] = useState(false);

    const songName = trackData?.data.name;
    const artists = trackData?.data.artists;
    const album = trackData?.data.album.name;

    const key = keys[analysisData?.data.key];
    const bpm = Math.round(analysisData?.data.tempo);
    const duration = millisecondsToMinutes(analysisData?.data.duration_ms);
    const mode = modes[analysisData?.data.mode];

    //Dummy image if no album image is available
    const image = trackData?.data.album.images[0] ? trackData?.data.album.images[0].url : '/images/noalbumimage.png';

    async function getInfo() {
        nProgress.start();
        try {
            const analysisResponse = await fetch('/api/trackFeatures', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ songId }),
            });
            const analysisData = await analysisResponse.json();
            if(analysisData.data.error){
                router.push('/song-not-found');
            }
            setAnalysisData(analysisData);

            const infoResponse = await fetch('/api/trackInfo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ songId }),
            });
            const trackData = await infoResponse.json();
            setTrackData(trackData);
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
        getInfo();
    }, []);


    useEffect(() => {
        if (analysisData && trackData) {
            try {
                const getLyrics = async () => {
                    const lyricsRes = await fetch(
                        `/api/lyrics?title=${encodeURIComponent(cleanSongName(trackData.data.name))}&artist=${encodeURIComponent(trackData.data.artists[0].name)}`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                        }
                    );

                    const lyricsData = await lyricsRes.json();

                    if (lyricsData.songUrl) {
                        setLyricsUrl(lyricsData.songUrl);
                    } else {
                        setError('Lyrics not found');
                    }

                    if (lyricsData.songId != null) {
                        setLyricsId(lyricsData.songId);
                    } else {
                        setError('Lyrics not found');
                    }
                };

                setLoaded(true);

                if (lyricsId == null && analysisData.data.instrumentalness < 0.5) {
                    getLyrics();
                }
            } catch {
                setError("No data found");
            }
        }
    }, [analysisData, trackData, lyricsId]);

    const handleColor = (bgcolor) => {
        setColor(bgcolor);
    };

    return (
        <div className="relative min-h-screen">
            {color !== '' && 
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
                    {loaded != false && (
                        <SongStats songKey={key} bpm={bpm} duration={duration} mode={mode} />
                    )}
                </div>
                <div className="w-full">
                    {loaded != false && (
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
