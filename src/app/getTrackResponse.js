'use server'
import axios from 'axios';
import { getToken } from './getToken';
import { cookies } from 'next/headers';

//Takes an accessToken and a songID, makes an API request to spotify and returns a json of the song analysis
export async function getTrackResponse(songId){
    getToken();
    const trackResponse = await axios.get(`https://api.spotify.com/v1/audio-analysis/${songId}`, {
        headers: {
            Authorization: `Bearer ${cookies().get('access_token').value}`,
            },
        });
    
    const trackInfoResponse = await axios.get(`https://api.spotify.com/v1/tracks/${songId}`, {
        headers: {
            Authorization: `Bearer ${cookies().get('access_token').value}`,
            },
        });

    return await [trackResponse.data.track.key, 
            trackResponse.data.track.tempo, 
            trackResponse.data.track.mode,
            trackResponse.data.track.duration,
            trackInfoResponse.data.album.name,
            trackInfoResponse.data.album.images[1].url,
            trackInfoResponse.data.artists,
            trackInfoResponse.data.name];
}