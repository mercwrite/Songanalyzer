'use client';
import SongStats from "./songstats";
import SongInfo from "./songinfo";
import { useEffect, useState } from "react";

const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const modes = ["Minor", "Major"];

function secondsToMinutes(seconds){
    let minutes = Math.floor(seconds/60);
    let remainder = Math.round(seconds % 60);
    let leadingZero = '';
    remainder < 10 ? leadingZero = '0' : leadingZero = '';

    return `${minutes.toString()}:${leadingZero}${remainder.toString()}`;
}

export default function SongDisplay (props){

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
    async function getInfo () {
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

    if(!info){
        setInfo(true);
        getInfo();
        
    }

    useEffect(() =>{
        if(props.songId != songId){
            setSongId(props.songId);
            setInfo(false);
        }
    }, [props.songId]);

    useEffect(() =>{
        if(analysisData != null && trackData != null){
            try{
            setKey(keys[analysisData.data.track.key]);
            setBpm(Math.round(analysisData.data.track.tempo))
            setMode(modes[analysisData.data.track.mode])
            setDuration(secondsToMinutes(analysisData.data.track.duration));
            setImage(trackData.data.album.images[0].url);
            setSongName(trackData.data.name);
            setArtists(trackData.data.artists);
            setAlbum(trackData.data.album.name);
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
            {color != '' && 
            <div
            className="absolute top-13 left-0 w-full h-full z-0 pointer-events-none"
            style={{
                background: `linear-gradient(180deg, ${color} 0%, transparent 100%)`,
            }}
            key={color}
            />}
            <div className="relative p-5">
                <div className="absolute left-5">
                    {key !== null && <SongStats songKey={key} bpm={bpm} duration={duration} mode={mode}/>}
                </div>
                <div className="absolute right-5">
                    {image != null && <SongInfo img={image} songName={songName} artists={artists} album={album} onColor={handleColor}/>}
                </div>
            </div>
        </div>
    );
}
