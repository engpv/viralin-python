
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { StoryConfig } from "../types";

// Fixed: Strictly follow the initialization rule to use process.env.API_KEY directly as a named parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSystemPrompt = (id: string, config: StoryConfig): string => {
  const prompts: Record<string, string> = {
    ideas: `You are an expert in children's storytelling and educational content development. Generate 5 original and engaging children's story ideas. These story ideas must be inspired by local folklore, traditions, values, nature, or everyday life in ${config.country}. Focus on imaginative, emotionally resonant, and culturally grounded narratives for children aged 4–10.

Each idea must:
- Be original, age-appropriate, and spark imagination
- Reflect the cultural values of ${config.country}
- Have strong potential for visual storytelling
- Include a short summary (3–5 sentences)
- Be written in ${config.language}
- Number each idea clearly (Idea 1, Idea 2, etc.)`,

    storyboard: `You are a professional children's screenwriter. Generate a 20-scene storyboard for a 15-minute narrated story in ${config.language}. 
Structure exactly as:
Part 1 (Scenes 1-4): Exposition
Part 2 (Scenes 5-8): Rising Action  
Part 3 (Scenes 9-12): Climax
Part 4 (Scenes 13-16): Falling Action
Part 5 (Scenes 17-20): Resolution

Rules:
- No dialogue, narration only.
- 5 narration sentences per scene.
- No violence or fear.
- Soft, poetic, whimsical tone.`,

    text2image: `Convert the storyboard into 20 scene-by-scene image prompts in English.
1. List named characters with visual descriptions.
2. For each scene: Scene [N] - Image Prompt: [Detailed character + action + environment + camera perspective + tags: 3D animation, Pixar style, magical realism, 8k].`,

    img2video: `Expand image prompts into cinematic video prompts in English.
For each scene: Scene [XX] - Video Prompt: [Character motion + background motion + camera movement].
Rules: English only, refer to characters by name, cinematic descriptions.`,

    soundfx: `Create whimsical sound effect descriptions for each of the 20 scenes in English.
Format: Scene [XX] - Sound FX: [2-3 sentences describing ambient tone, action cues, and mood].`,

    backsound: `Generate one cinematic backsound prompt (max 200 characters) for the entire episode in English.
Include Tone + Pacing + Instruments (xylophones, strings, etc.).
Format: Suno Prompt: [content]`,

    intro_outro: `Write a YouTube intro (60s) and outro (60s) in ${config.language} based on the story. 
Include a hook, call-to-action, and wrap-up message.`
  };
  return prompts[id] || "";
};

export const streamGeneration = async (
  stepId: string, 
  config: StoryConfig, 
  context: string,
  onChunk: (text: string) => void
) => {
  const systemPrompt = getSystemPrompt(stepId, config);
  // Fixed: Use ai.models.generateContentStream to query GenAI.
  const response = await ai.models.generateContentStream({
    model: 'gemini-3-flash-preview',
    contents: `${context}`,
    config: {
      systemInstruction: systemPrompt,
      temperature: 0.8,
    },
  });

  let fullText = "";
  for await (const chunk of response) {
    // Fixed: Accessed .text property directly (not a method) as per guidelines.
    const text = (chunk as GenerateContentResponse).text;
    if (text) {
      fullText += text;
      onChunk(fullText);
    }
  }
  return fullText;
};
