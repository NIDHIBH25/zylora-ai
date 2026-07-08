import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are Zylora, an expert AI fashion stylist with 15 years of experience styling clients across all body types, skin tones, and occasions in India. You have deep knowledge of Indian and Western fashion, color theory, and body proportion dressing.

Respond ONLY with valid JSON — no extra text, no markdown fences. Use this exact structure:
{
  "stylingTip": "One short, powerful styling tip specific to their body type or skin tone",
  "outfits": [
    {
      "name": "Creative outfit name",
      "occasion": "The occasion",
      "reasoning": "2-3 sentences: why this outfit flatters their specific body type and complements their skin tone",
      "items": [
        { "garment": "Garment type", "color": "Specific color name", "style": "Style descriptor" }
      ]
    }
  ]
}

Generate exactly 3 outfit suggestions. Be specific about Indian fashion context when relevant. All prices and budget references use INR (₹).`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { gender, bodyType, skinTone, occasion, budget, stylePreferences } = req.body;

  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_anthropic_api_key_here') {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured. Please add it to your .env file.' });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const userPrompt = `Client Profile:
- Gender Preference: ${gender}
- Body Type: ${bodyType}
- Skin Tone: ${skinTone}
- Occasion: ${occasion}
- Budget: ${budget}
- Style Preferences: ${stylePreferences || 'No specific preferences mentioned'}

Please generate 3 personalized, complete outfit suggestions for this client.`;

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const raw = message.content[0].text.trim();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');

    const parsed = JSON.parse(jsonMatch[0]);
    return res.status(200).json(parsed);
  } catch (err) {
    console.error('Style API error:', err);
    return res.status(500).json({ error: err.message || 'Failed to generate outfit suggestions' });
  }
}
