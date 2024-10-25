'use client';
import SongStats from "./songstats";
import SongInfo from "./songinfo";
import { useEffect, useState } from "react";
import nProgress from "nprogress";

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
    const [info, setInfo] = useState(false);
    const [songId, setSongId] = useState(props.songId);
    const [key, setKey] = useState(null);
    const [bpm, setBpm] = useState(null);
    const [duration, setDuration] = useState(null);
    const [mode, setMode] = useState(null);
    const [image, setImage] = useState(null);
    const [songName, setSongName] = useState('');
    const [artists, setArtists] = useState([]);
    const [album, setAlbum] = useState('');
    const [analysisData, setAnalysisData] = useState(null);
    const [trackData, setTrackData] = useState(null);
    const [error, setError] = useState(null);
    const [color, setColor] = useState('');
    const [lyricsUrl, setLyricsUrl] = useState(null);
    const [lyricsId, setLyricsId] = useState(null);

    async function getInfo() {
        nProgress.start();
        try {
            const analysisResponse = await fetch('/api/trackFeatures', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ songId }),
            });
            const analysisData = await analysisResponse.json();
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
            console.error(err);
        } finally {
            nProgress.done();
        }
    }

    useEffect(() => {
        if (!info) {
            setInfo(true);
            getInfo();
        }
    }, [info, songId]);

    useEffect(() => {
        if (props.songId !== songId) {
            setSongId(props.songId);
            setInfo(false);
        }
    }, [props.songId, songId]);

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

                setKey(keys[analysisData.data.key]);
                setBpm(Math.round(analysisData.data.tempo));
                setMode(modes[analysisData.data.mode]);
                setDuration(millisecondsToMinutes(analysisData.data.duration_ms));
                if(trackData.data.album.images[0]){
                    setImage(trackData.data.album.images[0].url);
                } else{
                    setImage('/images/noalbumimage.png');
                }
                setSongName(trackData.data.name);
                setArtists(trackData.data.artists);
                setAlbum(trackData.data.album.name);

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
                    {key !== null && (
                        <SongStats songKey={key} bpm={bpm} duration={duration} mode={mode} />
                    )}
                </div>
                <div className="w-full">
                    {image != null && (
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
