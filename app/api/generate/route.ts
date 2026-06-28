import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

// Initialize the Gemini client securely on the server
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY as string 
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Call the Gemini model
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', 
      contents: prompt,
    });

    // Return the generated markdown text
    return NextResponse.json({ result: response.text });

  } catch (error) {
    console.error("Backend Engine Error:", error);
    return NextResponse.json(
      { error: "Failed to generate content from Gemini" }, 
      { status: 500 }
    );
  }
}