import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


export async function GET(request: NextRequest) {

    const mood = request.nextUrl.searchParams.get("mood");
    const songNumber = request.nextUrl.searchParams.get("songNumber");


    const prompt = `
Act as a music curator specializing in mood-based and culturally relevant playlists. Generate ${songNumber} songs that match the following prompt: ${mood}.

When generating the list:
- If the prompt specifies a particular language or cultural context (e.g., 'French songs,' 'Bollywood hits'), prioritize songs from that language or culture.
- If a specific country or region is mentioned without specifying a language or culture, prioritize songs that are popular, traditional, or culturally significant in that area, preferably in the local language.
- If no country, region, language, or culture is specified, focus on a diverse mix of songs that match the mood or theme.
- Include a mix of popular and lesser-known tracks.
- Prioritize songs where lyrics, tempo, or genre match the mood.
- Ensure the list is fresh and varied each time.

Format rules:
1. List ONLY song titles and artists separated by " - ".
2. Separate each entry with a "|" character.
3. Do not include numbers, bullet points, or extra text.
4. Respond in plain text only.
5. If the prompt has a genre name, DO NOT suggest songs outside that genre

Example output:
Song Title 1 - Artist 1 | Song Title 2 - Artist 2 | ... | Song Title 10 - Artist 10
`;

    
    try{
        const result = await model.generateContent(prompt);
        return NextResponse.json({
            result: result.response.text()
        })
    } catch(error: any){
        console.log(error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
          );
    }
    

    






}



