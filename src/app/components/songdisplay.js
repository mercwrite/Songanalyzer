'use client';
import SongStats from "./songstats";
import SongInfo from "./songinfo";
import Lyrics from "./lyrics";
import { useEffect, useState } from "react";
import nProgress from "nprogress";

const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const modes = ["Minor", "Major"];

function milisecondsToMinutes(miliseconds){
    let seconds = Math.round(miliseconds/1000);
    let minutes = Math.floor(seconds/60);
    let remainder = Math.round(seconds % 60);
    let leadingZero = '';
    remainder < 10 ? leadingZero = '0' : leadingZero = '';

    return `${minutes.toString()}:${leadingZero}${remainder.toString()}`;
}

function cleanSongName(songName) {
    // Regular expression patterns to match various suffixes
    const patterns = [
      /\s*-\s*remastered\s*\d{0,4}/i,       // Remastered + optional year
      /\s*-\s*anniversary edition/i,         // Anniversary edition
      /\s*-\s*live( at [\w\s]+)?/i,          // Live versions, optional location
      /\s*-\s*deluxe edition/i,              // Deluxe edition
      /\s*-\s*radio edit/i,                  // Radio edit
      /\s*-\s*acoustic( version)?/i,         // Acoustic version
      /\s*-\s*extended( version)?/i,         // Extended version
      /\s*-\s*explicit/i,                    // Explicit
      /\s*-\s*clean version/i,               // Clean version
      /\s*-\s*censored/i,                    // Censored
      /\s*-\s*alternate take/i,              // Alternate take
      /\s*-\s*demo/i,                        // demo
      /\s*\(\d{4} remaster\)/i               // (year remaster) 
    ];
  
    // Apply all patterns to clean the song name
    let cleanedName = songName;
    patterns.forEach(pattern => {
      cleanedName = cleanedName.replace(pattern, '');
    });
  
    // Trim any extra whitespace
    return cleanedName.trim();
  }

export default function SongDisplay (props){

    const [info, setInfo] = useState(false);
    const pSongId = props.songId;
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
    async function getInfo () {
        //Get Audio analysis information from the api
        nProgress.start();
        fetch('/api/trackFeatures', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({songId}),
        }).then((response) => {
            return response.json();
        }).then((data) =>{
            setAnalysisData(data);
        }).catch(() => {
            setAnalysisData(null);
            setError('Failed to get track analysis');
        });

        fetch('/api/trackInfo', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({songId})
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setTrackData(data);
        }).catch(() => {
            setTrackData(null);
            setError('Failed to get track info');
        });

        nProgress.done();
    }


    if(!info){
        setInfo(true);
        getInfo();
        
    }

    useEffect(() =>{
        if(pSongId != songId){
            setSongId(pSongId);
            setInfo(false);
        }
    }, [pSongId]);

    useEffect(() =>{
        if(analysisData != null && trackData != null){
            try{

                const getLyrics = async() =>{
                    const lyricsRes = await fetch(
                        `/api/lyrics?title=${encodeURIComponent(cleanSongName(trackData.data.name))}&artist=${encodeURIComponent(trackData.data.artists[0].name)}`
                      );
            
                    const lyricsData = await lyricsRes.json();
            
                    if (lyricsData.songUrl) {
                    setLyricsUrl(lyricsData.songUrl);
                    } else {
                    setError('Lyrics not found');
                    }

                    if(lyricsData.songId != null){
                        setLyricsId(lyricsData.songId);
                    }else{
                        setError('Lyrics not found');
                    }
                }
            setKey(keys[analysisData.data.key]);
            setBpm(Math.round(analysisData.data.tempo))
            setMode(modes[analysisData.data.mode])
            setDuration(milisecondsToMinutes(analysisData.data.duration_ms));
            setImage(trackData.data.album.images[0].url);
            setSongName(trackData.data.name);
            setArtists(trackData.data.artists);
            setAlbum(trackData.data.album.name);
            if(lyricsId == null && analysisData.data.instrumentalness < 0.5){
                getLyrics();
            }
            }catch{
                setError("No data found");
            }
        }
    }, [analysisData, trackData]);

    const handleColor = (bgcolor) =>{
        setColor(bgcolor);
    }

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
