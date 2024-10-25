import axios from 'axios';
import { fetchSpotifyToken } from '@/app/fetchToken';

export async function POST(request){
    const data = await request.json();
    const query = await data.query;
    const offset = await data.offset;
    const spotifyToken = await fetchSpotifyToken();

    if (!query){
        return new Response(JSON.stringify({ error: 'No query provided' }, { status: 400 }));
      }
      if (!spotifyToken) {
        return new Response(JSON.stringify({ error: 'Spotify access token not found' }, { status: 401 }));
      }
    
      try {
        console.log(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&offset=${offset}&limit=20`);
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&offset=${offset}&limit=20`, {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
        });

        const data = await response.data;
        return new Response(JSON.stringify({data}, {status: 200}));
      } catch (error) {
        //console.error(error);
        return new Response(JSON.stringify({error: 'Search failed'}, {status: 500}));
      }
}