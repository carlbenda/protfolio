import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_TEXT } from '../constants';

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
    ai = null;
  }
} else {
  console.warn(
    "Gemini API key not found. Please set the API_KEY environment variable. AI features will use fallback data."
  );
}

export const generateWelcomeMessage = async (name: string): Promise<string> => {
  if (!ai) {
    console.log("Gemini service not available, using fallback welcome message.");
    return "Hey there! I’m Mursalin Irfan — a curious mind, full-time student, and passionate web developer who loves building things for the web.";
  }

  const prompt = `Generate a short, friendly, and slightly playful welcome message (around 20-30 words) for the portfolio of a web developer named ${name}. The portfolio has a 'Pixel Habit Garden' theme. Encourage visitors to explore.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_MODEL_TEXT,
        contents: prompt,
        config: {
            temperature: 0.75, // Slightly more creative for a playful theme
            topP: 0.9,
            topK: 40,
        }
    });
    
    const text = response.text;
    if (text) {
        return text.trim();
    }
    throw new Error("Empty response from Gemini API for welcome message.");

  } catch (error) {
    console.error("Error generating welcome message with Gemini:", error);
    // Fallback in case of API error, uses the same new message
    return "Hey there! I’m Mursalin Irfan — a curious mind, full-time student, and passionate web developer who loves building things for the web.";
  }
};