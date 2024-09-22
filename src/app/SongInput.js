'use client'
import React from "react";
import { useState } from "react";
import SongStats from "./SongStats";
import { getTrackResponse } from './getTrackResponse';

const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const modes = ["Minor", "Major"];

function secondsToMinutes(seconds){
    let minutes = Math.floor(seconds/60);
    let remainder = seconds % 60;

    return `${minutes.toString()}:${remainder.toString()}`;
}

export default function SongInput(props){
    const [songId, setSongId] = useState('');
    const [songStats, setSongStats] = useState(null);
    const [key, setKey] = useState();
    const [bpm, setBpm] = useState();
    const [duration, setDuration] = useState();
    const [mode, setMode] = useState();


    const handleClick = async() =>{
        
        //Get Audio analysis information from the api
        const trackResponse = await getTrackResponse(props.accessToken, songId);
        
        setKey(keys[trackResponse[0]]);
        setBpm(trackResponse[1]);
        setMode(modes[trackResponse[2]]);
        setDuration(secondsToMinutes(trackResponse[3]));

        setSongStats(<SongStats songKey={key} bpm={bpm} duration={duration} mode={mode}/>)
        
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
            {songStats}
        </div>
    );
}