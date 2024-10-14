import axios from 'axios';
import { fetchSpotifyToken } from '@/app/fetchToken';


export async function POST(req) {

  const { songId } = await req.json(); 
  const spotifyToken = await fetchSpotifyToken();
  if (!songId){
    return new Response(JSON.stringify({ error: 'No song ID provided'}, { status: 400}));
  }
  if (!spotifyToken) {
    return new Response(JSON.stringify({ error: 'Spotify access token not found' }, { status: 401}));
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/audio-analysis/${songId}`, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });
    const data = await response.data;
    return new Response(JSON.stringify({ data }, { status: 200}));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch Spotify data' }, { status: 500 }));
  }
}

