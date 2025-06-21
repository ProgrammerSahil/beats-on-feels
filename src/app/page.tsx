"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import SpotifyButton from "./components/SpotifyButton";

interface ApiResponse {
  result: string;
}

export default function Home() {
  const [songNumber, setSongNumber] = useState(20);
  const [songs, setSongs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [buttonPress, setButtonPress] = useState(false);
  const [mood, setMood] = useState("");

  // Preset mood options
  const presetMoods = [
    { label: "Gym Mood 💪", value: "energetic workout music to push through the final rep" },
    { label: "80s Pop 🎵", value: "nostalgic 80s pop hits with synth and big hair energy" },
    { label: "Chill Vibes 😌", value: "relaxing ambient music for studying or working" },
    { label: "Road Trip 🚗", value: "upbeat songs perfect for a long drive with friends" }
  ];

  const getSongs = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `/api/getSongsArray?mood=${mood}&songNumber=${songNumber}`
      );
      const result = response.data.result;
      const songsArray = result.split("|");
      setSongs(songsArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const onSearch = () => {
    setLoading(true);
    setButtonPress(true);
    getSongs();
  };

  const handlePresetClick = (presetValue: string) => {
    setMood(presetValue);
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{ background: "var(--background)" }}
    >
    
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 py-4 gradient-text tracking-tighter">
            <span className="font-playwrite"> Beats on Feels </span>
          </h1>
          <div className="text-xl text-[var(--text)] opacity-90 mb-8">
            Generate a playlist based on your mood
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-md flex flex-col md:flex-row gap-4 md:gap-4">
              <input
                type="text"
                placeholder="Enter a mood here..."
                className="w-full px-6 py-4 rounded-2xl bg-[var(--containerBackground)] 
                text-[var(--text)] placeholder-[var(--text-secondary)]
                border-2 border-[var(--accent-secondary)] focus:outline-none
                focus:border-[var(--accent)] transition-colors duration-200
                shadow-lg"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && onSearch()}
              />
              <button
                onClick={onSearch}
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]
                text-white font-semibold rounded-2xl shadow-lg hover:opacity-90 
                transition-opacity duration-200 whitespace-nowrap"
              >
                Generate Mix
              </button>
            </div>
            
            <div className="w-full max-w-md px-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-[var(--text-secondary)]">Fewer songs</span>
                <span className="text-sm font-medium text-[var(--accent)]">{songNumber} songs</span>
                <span className="text-sm text-[var(--text-secondary)]">More songs</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="50" 
                value={songNumber} 
                className="w-full h-2 bg-[var(--containerBackground)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                style={{
                  background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${(songNumber - 5) * 100 / 45}%, var(--containerBackground) ${(songNumber - 5) * 100 / 45}%, var(--containerBackground) 100%)`
                }}
                onChange={(e) => setSongNumber(parseInt(e.target.value))} 
                id="myRange"
              />
              <div className="flex justify-between mt-1 text-xs text-[var(--text-secondary)]">
                <span>5</span>
                <span>20</span>
                <span>35</span>
                <span>50</span>
              </div>
            </div>
            
            {/* Preset mood buttons - now below the main input elements */}
            <div className="w-full max-w-md mt-4">
              <div className="text-sm text-[var(--text-secondary)] mb-2 text-center">
                Or try one of these moods:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {presetMoods.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handlePresetClick(preset.value)}
                    className="px-3 py-2 rounded-lg bg-[var(--containerBackground)] 
                    text-[var(--text-secondary)] hover:text-[var(--text)]
                    border border-[var(--containerBackground)] hover:border-[var(--accent-secondary)]
                    transition-all duration-200 text-sm shadow-sm"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {!buttonPress ? (
          <div></div>
        ) : (
          <div>
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
                    onClick={async () => {
                      try {
                        const response = await axios.get(
                          `/api/redirectToSpotifySong?song=${encodeURIComponent(song)}`
                        );
                        window.open(response.data.url, "_blank");
                      } catch (error) {
                        console.error("Error opening song:", error);
                      }
                    }}
                  >
                    <span className="text-[var(--accent-secondary)] mr-3">
                      #{index + 1}
                    </span>
                    {song}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}