'use server';
import { cookies } from "next/headers";

export async function fetchSpotifyToken() {
    const cookieStore = cookies();
    if (cookieStore.has("spotifyToken") == false) {
      // Fetch new token if not found in cookies
      const tokenResponse = await fetch('http://localhost:3000/api/spotifyToken',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
      });
      if (!tokenResponse.ok) throw new Error('Failed to fetch Spotify token');
      const data = await tokenResponse.json();
      const age = 3599;
      cookieStore.set("spotifyToken", data.access_token, {
        maxAge: age,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      return data.access_token;
    }
  
    return cookieStore.get("spotifyToken").value;
  }
