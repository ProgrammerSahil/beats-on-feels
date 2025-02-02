"use client";

import axios from "axios";
import { useEffect, useState } from "react";


interface ApiResponse {
  result: string;
}

export default function Home() {
  const mood = "like im driving in miami in the 80s";
  const songNumber = 25;

  const [songs, setSongs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    getSongs();
  }, []);

  return (

    <div className="flex justify-center flex-col">
      <div className="text-center">
        <h1 className="font-playwrite" >Welcome to Feels on Beat</h1>
        <p>generate a playlist based on your mood</p>
      </div>

      {loading?(
        <button
        disabled={false}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition duration-300 transform hover:scale-105 active:scale-95"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin h-5 w-5 mr-3 text-white"
        >
          <circle
            strokeWidth="4"
            stroke="currentColor"
            r="10"
            cy="12"
            cx="12"
            className="opacity-25"
          ></circle>
          <path
            d="M4 12a8 8 0 018-8v8H4z"
            fill="currentColor"
            className="opacity-75"
          ></path>
        </svg>
        Loading...
      </button>
      ):(
        <div className="mt-4">
        {songs.map((song, index) => (
          <div key={index} className="p-2 border-b">
            {song}
          </div>
        ))}
      </div>
      )}

      

    </div>
  );
}