import axios from 'axios';
import { fetchSpotifyToken } from '@/app/fetchToken';

export async function GET(req) {
    const SPOTIFY_TOP50_PLAYLIST_ID = '37i9dQZEVXbMDoHDwVN2tF';
    const url = `https://api.spotify.com/v1/playlists/${SPOTIFY_TOP50_PLAYLIST_ID}`; 
  
    const spotifyToken = await fetchSpotifyToken();
    if (!spotifyToken) {
      return new Response(JSON.stringify({ error: 'Spotify access token not found' }, { status: 401}));
    }
  
    try {
      const response = await axios.get(url, {
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
  
  