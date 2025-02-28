import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


export async function GET(request: NextRequest) {
  try {
    const song = request.nextUrl.searchParams.get("song");
    
    if (!song) {
      return NextResponse.json({ error: "Song parameter is required" }, { status: 400 });
    }

    // Get access token using client credentials flow
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Search for the track
    const searchResponse = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(song)}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.data.access_token}`,
        },
      }
    );

    const track = searchResponse.data.tracks.items[0];
    
    if (!track) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    return NextResponse.json({
      url: track.external_urls.spotify
    });

  } catch (error: any) {
    console.error("Spotify search error:", error);
    return NextResponse.json(
      { error: "Failed to search track" },
      { status: 500 }
    );
  }
}