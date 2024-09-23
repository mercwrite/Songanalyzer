'use client'
import React from "react";
import { useState } from "react";
import SongStats from "./SongStats";
import { getTrackResponse } from './getTrackResponse';

const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const modes = ["Minor", "Major"];

function secondsToMinutes(seconds){
    let minutes = Math.floor(seconds/60);
    let remainder = Math.floor(seconds % 60);

    return `${minutes.toString()}:${remainder.toString()}`;
}

export default function SongInput(){
    const [songId, setSongId] = useState('');
    const [key, setKey] = useState(null);
    const [bpm, setBpm] = useState(null);
    const [duration, setDuration] = useState(null);
    const [mode, setMode] = useState(null);


    async function handleClick () {
        
        //Get Audio analysis information from the api
        const trackResponse = await getTrackResponse(songId);
        setKey(keys[trackResponse[0]]);
        setBpm(Math.ceil(trackResponse[1]));
        setMode(modes[trackResponse[2]]);
        setDuration(secondsToMinutes(trackResponse[3]));
        
    }


    return(
        <div>
            <input type="text"
            placeholder="Enter Song Id..."
            value={songId}
            onChange={(event) => setSongId(event.target.value)}/>
            <button onClick={handleClick}>
                Search
            </button>
            {key !== null && <SongStats songKey={key} bpm={bpm} duration={duration} mode={mode}/>}
        </div>
    );
}