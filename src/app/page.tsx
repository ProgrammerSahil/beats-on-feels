"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import SpotifyButton from "./components/SpotifyButton";

interface ApiResponse {
  result: string;
}



export default function Home() {
  const mood = "80s pop songs like self control, maria magdalena, in the heat of the night etc etc";
  const songNumber = 20;

  const [songs, setSongs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const getSongs = async () => {
    try {
      const response = await axios.get<ApiResponse>(`/api/getSongsArray?mood=${mood}&songNumber=${songNumber}`);
      const result = response.data.result;
      const songsArray = result.split("|");
      setSongs(songsArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };


  useEffect(() => {
    getSongs();
  }, []);

  return (
    <div className="min-h-screen p-8" style={{ background: 'var(--background)' }}>
      
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 py-4 gradient-text tracking-tighter">
            Welcome to <span className="font-playwrite"> Feels on Beat </span>
          </h1>
          <div className="text-xl text-[var(--text)] opacity-90">
            Generate a playlist based on your mood
          </div>
        </div>

        {loading ? (
          <button
            className="w-full max-w-xs mx-auto bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] 
                      text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-opacity hover:opacity-90
                      flex items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin h-6 w-6 mr-3 text-white"
            >
              <circle
                strokeWidth="4"
                stroke="currentColor"
                r="10"
                cy="12"
                cx="12"
                className="opacity-25"
              />
              <path
                d="M4 12a8 8 0 018-8v8H4z"
                fill="currentColor"
                className="opacity-75"
              />
            </svg>
            Loading...
          </button>
        ) : (
          <div className="mt-8 space-y-4">
            <SpotifyButton mood={mood} songs={songs} />
            {songs.map((song, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg bg-[var(--containerBackground)] 
                          hover:bg-[var(--accent)] transition-colors duration-200
                          text-[var(--text)] hover:text-white cursor-pointer
                          shadow-md"
              >
                <span className="text-[var(--accent-secondary)] mr-3">#{index + 1}</span>
                {song}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}