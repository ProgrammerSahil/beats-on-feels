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

  useEffect(() => {
    const getSongs = async () => {
      try {
        const response = await axios.get<ApiResponse>(`/api/getSongsArray?mood=${mood}&songNumber=${songNumber}`);
        
        
        const result = response.data.result;
        const songsArray = result.split("|");

        setSongs(songsArray);

        

      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    getSongs();
  }, []);

  return (
    <div className="flex justify-center flex-col">
      <div className="text-center">
        <h1>Welcome to Feels-on-Beat</h1>
        <p>generate a playlist based on your mood</p>
      </div>

      <div className="mt-4">
        {songs.map((song, index) => (
          <div key={index} className="p-2 border-b">
            {song}
          </div>
        ))}
      </div>

    </div>
  );
}