import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function GET(request: NextRequest) {

    const mood = request.nextUrl.searchParams.get("mood");
    const songNumber = request.nextUrl.searchParams.get("songNumber");


        const prompt = `
        Act as a music curator specializing in mood-based playlists. 
        Generate ${songNumber} songs that match the following mood/theme: ${mood}.

        Format rules:
        1. List ONLY song titles and artists separated by " - ".
        2. Separate each entry with a "|" character, no numbers or bullet points.
        3. Include a mix of popular and lesser-known tracks.
        4. Prioritize songs where lyrics, tempo, or genre match the mood.
        5. Avoid markdown formatting, respond in plain text only.
        6. Give different songs each time i prompt you

        Example output:
        Song Title 1 - Artist 1 | Song Title 2 - Artist 2 | ... | Song Title 10 - Artist 10
        `;

    
    try{
        const result = await model.generateContent(prompt);
        return NextResponse.json({
            result: result.response.text()
        })
    } catch(error: any){
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
          );
    }
    

    






}



