'use client'
import React from "react";
import { useState } from "react";
import SongStats from "./SongStats";
import { getTrackResponse } from './getTrackResponse';
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

    async function handleClick () {
        
        //Get Audio analysis information from the api
        const trackResponse = await getTrackResponse(songId);
        setKey(keys[trackResponse[0]]);
        setBpm(Math.round(trackResponse[1]));
        setMode(modes[trackResponse[2]]);
        setDuration(secondsToMinutes(trackResponse[3]));
        setImage(trackResponse[5]);
        setSongName(trackResponse[7]);
        setArtists(trackResponse[6]);
        setAlbum(trackResponse[4]);
        
    }


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
            className="h-10 font-bold px-5 tranistion-colors duration-150 border border-bg-sky-500 rounded-lg focus:shadow-outline hover:bg-sky-500 hover:text-bg-sky-100"
            onClick={handleClick}>
                Search
            </button>
            <div className="p-2">
            </div>
            {key !== null && <SongStats songKey={key} bpm={bpm} duration={duration} mode={mode}/>}
            <div>
                {image != null && <SongInfo img={image} songName={songName} artists={artists} album={album}/>}
            </div>
        </div>
    );
}