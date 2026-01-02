
import { GoogleGenAI, Type } from "@google/genai";
import { ExchangeRateData } from "../types";

export const fetchLiveExchangeRate = async (): Promise<ExchangeRateData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Search Google Finance for the current mid-market exchange rate of 1 Tanzanian Shilling (TZS) to Indian Rupee (INR). Provide the numeric rate with high precision (at least 5 decimal places).",
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rate: {
              type: Type.NUMBER,
              description: "The exchange rate for 1 TZS to INR as a floating point number.",
            },
            provider: {
              type: Type.STRING,
              description: "The financial data provider identified from the search.",
            }
          },
          required: ["rate"],
        }
      },
    });

    let rate = 0.033124; // Default safe fallback
    try {
      const json = JSON.parse(response.text);
      if (json && typeof json.rate === 'number') {
        rate = json.rate;
      }
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      // Attempt manual extraction if JSON fails but text contains a number
      const fallbackMatch = response.text.match(/0\.[0-9]+/);
      if (fallbackMatch) rate = parseFloat(fallbackMatch[0]);
    }

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web?.title || "Google Finance",
        uri: chunk.web?.uri || "",
      }));

    return {
      rate,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      sources: sources.slice(0, 3),
    };
  } catch (error) {
    console.error("Error fetching live rate:", error);
    return {
      rate: 0.033124,
      lastUpdated: new Date().toLocaleTimeString(),
      sources: [],
    };
  }
};
