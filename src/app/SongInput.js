'use client'
import React, { useEffect } from "react";
import { useState } from "react";
import SongStats from "./SongStats";
import SongInfo from "./SongInfo";

const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const modes = ["Minor", "Major"];

function secondsToMinutes(seconds){
    let minutes = Math.floor(seconds/60);
    let remainder = Math.round(seconds % 60);
    let leadingZero = '';
    remainder < 10 ? leadingZero = '0' : leadingZero = '';

    return `${minutes.toString()}:${leadingZero}${remainder.toString()}`;
}

export default function SongInput(){
    
    const [songId, setSongId] = useState('');
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

    async function handleClick () {
        //Get Audio analysis information from the api
        fetch('/api/trackAnalysis', {
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
    }

    useEffect(() =>{
        if(analysisData != null && trackData != null){
            setKey(keys[analysisData.data.track.key]);
            setBpm(Math.round(analysisData.data.track.tempo))
            setMode(modes[analysisData.data.track.mode])
            setDuration(secondsToMinutes(analysisData.data.track.duration));
            setImage(trackData.data.album.images[1].url);
            setSongName(trackData.data.name);
            setArtists(trackData.data.artists);
            setAlbum(trackData.data.album.name);
        }
    }, [analysisData, trackData]);


    return(
        <div>
            <input type="text"
            className="flex rounded-xl border-gray-400 drop-shadow-2xl placeholder-slate-600 text-slate-800 placeholder:p-2 text-left"
            placeholder="Enter Song Id..."
            value={songId}
            onChange={(event) => setSongId(event.target.value)}/>
            <div className="p-2">
            </div>
            <button 
            className="h-10 font-bold px-5 transition-colors duration-150 border border-bg-sky-500 rounded-lg focus:shadow-outline hover:bg-sky-500 hover:text-bg-sky-100"
            onClick={handleClick}>
                Search
            </button>
            {error != null && <text>Error: {error}</text>}
            <div className="p-2">
            </div>
            {key !== null && <SongStats songKey={key} bpm={bpm} duration={duration} mode={mode}/>}
            <div className=" float-right">
                {image != null && <SongInfo img={image} songName={songName} artists={artists} album={album}/>}
            </div>
        </div>
    );
}