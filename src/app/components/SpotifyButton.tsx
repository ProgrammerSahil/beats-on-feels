"use client";

import { useState } from "react";

interface SpotifyButtonProps {
  mood: string;
  songs: string[];
}

const SpotifyButton = ({ mood, songs }: SpotifyButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiateSpotifyAuth = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const state = Math.random().toString(36).substring(2, 15);
      
      // Set cookies with SameSite and Secure attributes
      document.cookie = `spotify_auth_state=${state}; path=/; SameSite=Lax`;
      document.cookie = `spotify_mood=${encodeURIComponent(mood)}; path=/; SameSite=Lax`;
      document.cookie = `spotify_songs=${encodeURIComponent(JSON.stringify(songs))}; path=/; SameSite=Lax`;
  
      const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
      const redirectUri = encodeURIComponent(`${window.location.origin}/api/spotify-auth`);
      const scope = encodeURIComponent("playlist-modify-public");
      
      window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;
    } catch (err) {
      setError("Failed to initiate authentication");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={initiateSpotifyAuth}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? "Connecting to Spotify..." : "Create Spotify Playlist"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SpotifyButton;