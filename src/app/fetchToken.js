import Cookies from 'js-cookie';

export async function fetchSpotifyToken() {
    const spotifyToken = Cookies.get('spotifyToken');
    if (!spotifyToken) {
      // Fetch new token if not found in cookies
      const tokenResponse = await fetch('http://localhost:3000/api/spotifyToken',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
      });
      if (!tokenResponse.ok) throw new Error('Failed to fetch Spotify token');
      const data = await tokenResponse.json();


      Cookies.set('spotifyToken', data.access_token, {expires : 1 / 24});
      return data.access_token;
    }
  
    return spotifyToken.value;
  }
