import axios from 'axios';

//Takes an accessToken and a songID, makes an API request to spotify and returns a json of the song analysis
export async function getTrackResponse(accessToken, songId){
    const trackResponse = await axios.get(`https://api.spotify.com/v1/audio-analysis/${songId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        });


    return await [trackResponse.data.track.key, 
            trackResponse.data.track.tempo, 
            trackResponse.data.track.mode,
            trackResponse.data.track.duration];
}