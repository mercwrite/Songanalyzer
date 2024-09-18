// app/api/artist/route.js
import axios from 'axios';

export async function POST(request) {
    const { artistId } = await request.json();

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    // Step 1: Get the access token
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
            grant_type: 'client_credentials',
        },
    });

    const accessToken = tokenResponse.data.access_token;

    // Step 2: Fetch the artist data
    try {
        const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const followersCount = artistResponse.data.followers.total;
        return new Response(JSON.stringify({ followersCount }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: error.response?.status || 500 });
    }
}
