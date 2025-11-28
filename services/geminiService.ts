import { GoogleGenAI, Type } from "@google/genai";
import { SERVICES } from "../constants";

// Helper to get recommendation from Gemini based on user issue
export const getServiceRecommendation = async (userQuery: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key not found");

    const ai = new GoogleGenAI({ apiKey });

    // Construct a context-aware prompt
    const serviceList = SERVICES.map(s => `${s.id}: ${s.name} (${s.category} - ${s.description})`).join('\n');
    
    const prompt = `
      You are an expert home services assistant for "ElectraNow". We offer AC Services, Plumbing, Electrical, Appliances, and Smart Home solutions.
      A user is describing a problem: "${userQuery}".
      
      Here is our list of services:
      ${serviceList}
      
      Analyze the problem and recommend the BEST matching service ID from the list.
      If the user asks for something we don't strictly have but is related (e.g. "my fridge is broken"), check the Appliances category.
      If no service matches well, or the query is unrelated, return null.
      
      Also provide a short, helpful explanation (max 2 sentences) addressing the user directly and aggressively selling the solution.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedServiceId: { type: Type.STRING, nullable: true },
            explanation: { type: Type.STRING }
          }
        }
      }
    });

    return response.text;

  } catch (error) {
    console.error("Gemini Error:", error);
    return JSON.stringify({
      recommendedServiceId: null,
      explanation: "I'm having trouble connecting to the grid right now. Please browse our services manually!"
    });
  }
};