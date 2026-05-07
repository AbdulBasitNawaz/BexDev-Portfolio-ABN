import { LIVE_PROJECTS, FUTURE_PROJECTS, SKILLS } from "../constants";

const API_KEYS = [
    import.meta.env.VITE_GEMINI_KEY_1,
    import.meta.env.VITE_GEMINI_KEY_2,
    import.meta.env.VITE_GEMINI_KEY_3
].filter(key => !!key);

const SYSTEM_INSTRUCTION = `
You are the "Elite Virtual Agent" for Abdul Basit Nawaz. 
Your goal is to be the ultimate, high-speed bridge between Abdul Basit and the visitor.

STRICT RULE: BREVITY IS KEY.
- Every response MUST be short (max 2-3 sentences).
- Never use long paragraphs.
- If listing things, use simple bullet points.
- Get straight to the point. No fluff.

PERSONALITY:
- Sophisticated, tech-savvy, and direct.
- Represent Abdul Basit Nawaz as a top-tier engineer who values time and efficiency.

KNOWLEDGE BASE:
- NAME: Abdul Basit Nawaz
- SKILLS: ${JSON.stringify(SKILLS)}
- PROJECTS: ${JSON.stringify(LIVE_PROJECTS)}

GUIDELINES:
1. RECRUITERS: Give them the facts fast. Mention his ${SKILLS[0].items.slice(0, 3).join(", ")} expertise and point to the Contact section.
2. CLIENTS: Focus on his ability to "Ship fast and scale." 
3. SECRECY: Never mention you are an AI or Gemini. You are his Agent.

Keep it elite. Keep it short. Speak with authority.
`;

async function callGeminiApi(key, history, prompt, modelName) {
    // We use v1beta because gemini-2.5-flash requires it for system_instruction
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;
    
    const body = {
        system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        contents: [
            ...history,
            { role: "user", parts: [{ text: prompt }] }
        ]
    };

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errText = await response.text();
        return { success: false, message: errText, status: response.status };
    }

    const data = await response.json();
    return { success: true, text: data.candidates[0].content.parts[0].text };
}

export async function getChatResponse(history, prompt) {
    if (API_KEYS.length === 0) {
        throw new Error("No API keys found. Please check your .env file.");
    }

    const MODEL_NAME = "gemini-flash-latest";
    let lastError = null;

    // Iterate through keys and try the best model with each
    for (let i = 0; i < API_KEYS.length; i++) {
        const key = API_KEYS[i];
        try {
            console.log(`AI: Trying Key ${i + 1} with ${MODEL_NAME}...`);
            const result = await callGeminiApi(key, history, prompt, MODEL_NAME);
            
            if (result.success) return result.text;
            
            console.warn(`AI: Key ${i + 1} failed (${result.status})`);
            lastError = new Error(result.message);
            
            // If it's a 404 or 429, try the next KEY
            if (result.status === 404 || result.status === 429) continue;
            
            // For other errors, we might want to stop, but for reliability we'll try next key
            continue;
        } catch (error) {
            lastError = error;
            continue;
        }
    }

    throw lastError || new Error("Failed to connect to AI after trying all keys.");
}
