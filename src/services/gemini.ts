import { GoogleGenerativeAI } from '@google/generative-ai';
import { SME_CONTEXT } from '../constants/warungData';
import type { ChatMessage, WarungProfile } from '../types';

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Get the generative model
// Using gemini-2.0-flash-lite for higher free-tier quota
// Switch to 'gemini-2.0-flash' for better quality if you have a paid plan
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

/**
 * Build a system prompt that includes warung context.
 */
function buildSystemPrompt(warung?: WarungProfile | null): string {
  let prompt = SME_CONTEXT;

  if (warung) {
    prompt += `\n\nCurrent warung details:
- Name: ${warung.name}
- Owner: ${warung.ownerName}
- Location: ${warung.location || 'Not specified'}
- Type: ${warung.type}
- Language: ${warung.language}
- Operating Hours: ${warung.operatingHours.open} - ${warung.operatingHours.close}
- Menu Items: ${warung.menu.map((item) => `${item.name} (RM${item.price.toFixed(2)})`).join(', ')}`;
  }

  return prompt;
}

/**
 * Convert chat messages to Gemini's expected format.
 */
function formatChatHistory(messages: ChatMessage[]) {
  return messages.map((msg) => ({
    role: msg.role === 'model' ? ('model' as const) : ('user' as const),
    parts: [{ text: msg.content }],
  }));
}

/**
 * Send a chat message to Gemini and get a response.
 */
export async function sendChatMessage(
  userMessage: string,
  chatHistory: ChatMessage[],
  warung?: WarungProfile | null
): Promise<string> {
  try {
    const systemPrompt = buildSystemPrompt(warung);

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        {
          role: 'model',
          parts: [
            {
              text: "Understood! I'm ready to help you with your warung business. How can I assist you today?",
            },
          ],
        },
        ...formatChatHistory(chatHistory),
      ],
    });

    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to get response from AI. Please try again.');
  }
}

/**
 * Generate menu suggestions based on current menu and sales data.
 */
export async function generateMenuSuggestions(
  warung: WarungProfile
): Promise<string> {
  try {
    const prompt = `Based on this warung's menu and Malaysian food trends, suggest improvements:

Warung: ${warung.name}
Current Menu:
${warung.menu.map((item) => `- ${item.name}: RM${item.price.toFixed(2)}`).join('\n')}

Please provide 3-5 actionable suggestions for menu improvements, new items, or pricing changes.
Format each suggestion with a title and brief explanation.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate menu suggestions.');
  }
}

/**
 * Generate promotional content for social media.
 */
export async function generatePromoContent(
  warung: WarungProfile,
  platform: string,
  focusItem?: string
): Promise<string> {
  try {
    const prompt = `Create a promotional post for ${platform} for a Malaysian warung:

Warung: ${warung.name}
${focusItem ? `Focus Item: ${focusItem}` : `Menu highlights: ${warung.menu.slice(0, 5).map((i) => i.name).join(', ')}`}

Write an engaging, short promotional post suitable for ${platform}.
Include relevant emojis and make it appealing to Malaysian customers.
Use ${warung.language === 'bm' ? 'Bahasa Malaysia' : warung.language === 'en' ? 'English' : 'Manglish (a mix of BM and English)'}.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate promotional content.');
  }
}

/**
 * Generate a polite customer reply for complaints or inquiries.
 */
export async function generateCustomerReply(
  warung: WarungProfile,
  customerMessage: string
): Promise<string> {
  try {
    const prompt = `You are helping the owner of "${warung.name}", a Malaysian warung, reply to a customer message.

Customer message:
"${customerMessage}"

Write a polite, friendly reply from the warung owner.
- Keep it short (2-4 sentences max)
- Use ${warung.language === 'bm' ? 'Bahasa Malaysia' : warung.language === 'en' ? 'English' : 'Manglish (mix of BM and English)'}
- Be warm and apologetic if it's a complaint
- End with something that makes the customer want to come back`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate customer reply.');
  }
}
