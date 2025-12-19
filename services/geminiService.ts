import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

export const initChat = async (): Promise<Chat> => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are Victor जी's advanced AI support agent. 
      Your tone is futuristic, professional, ultra-fast, and polite.
      You help users book services (Cleaning, Plumbing, Electrician, Painter, Repair, Pest Control).
      You can explain our features: Instant SLA, AR Previews, and Verified Pros.
      Keep answers short and punchy. Use emojis sparingly but futuristic ones like ⚡, 💎, 🛡️.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = await initChat();
    const result = await chat.sendMessage({ message });
    return result.text || "I'm experiencing some interference. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection disrupted. Please check your network or try again later.";
  }
};