import { NextResponse } from 'next/server';

// Replace this with your actual Genius API access token
const GENIUS_ACCESS_TOKEN = process.env.GENIUS_CLIENT_ACCESS_TOKEN;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const artist = searchParams.get('artist');

  if (!title || !artist) {
    return NextResponse.json({ error: 'Title and artist are required.' }, { status: 400 });
  }

  const geniusApiUrl = `https://api.genius.com/search?q=${encodeURIComponent(title)} ${encodeURIComponent(artist)}`;

  try {
    const res = await fetch(geniusApiUrl, {
      headers: {
        Authorization: `Bearer ${GENIUS_ACCESS_TOKEN}`,
      },
    });

    const data = await res.json();

    if (!data.response.hits.length) {
      return NextResponse.json({ error: 'No lyrics found.' }, { status: 404 });
    }
    // Extract the first hit's id and url
    const song = data.response.hits[0].result;
    const songId = song.id;
    const songUrl = song.url;

    return NextResponse.json({ songId, songUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch lyrics.' }, { status: 500 });
  }
}