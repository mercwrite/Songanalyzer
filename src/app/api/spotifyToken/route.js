import axios from 'axios';

export async function POST(request) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    try {
      console.log("Sending a request");
      // Base64 encode the client ID and secret for authorization
      const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
      // Request an access token using the Client Credentials flow
      const response = await axios.post('https://accounts.spotify.com/api/token', null, {
          headers: {
              'Authorization': `Basic ${authString}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          params: {
          grant_type: 'client_credentials',
        },
      });
  
      const { access_token, expires_in } = response.data;
      
      return new Response(JSON.stringify({access_token}, {status:200}));
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Failed to fetch Spotify access token'}, {status: 500}));
    }
  
}