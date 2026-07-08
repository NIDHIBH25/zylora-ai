import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, history, intakeData } = req.body;

  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_anthropic_api_key_here') {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured.' });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const systemPrompt = `You are Zylora, a warm, expert AI fashion stylist. You already know this client's profile:
- Gender Preference: ${intakeData.gender}
- Body Type: ${intakeData.bodyType}
- Skin Tone: ${intakeData.skinTone}
- Occasion: ${intakeData.occasion}
- Budget: ${intakeData.budget}
- Style Preferences: ${intakeData.stylePreferences || 'None specified'}

You've already suggested outfits for them. Now answer their follow-up styling questions in a warm, conversational, expert tone. Be specific, actionable, and always keep their profile in mind. Use INR (₹) for any price references. Keep responses concise — 2-4 sentences unless more detail is genuinely needed.`;

    const messages = [
      ...history.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: message },
    ];

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    return res.status(200).json({ reply: response.content[0].text });
  } catch (err) {
    console.error('Chat API error:', err);
    return res.status(500).json({ error: err.message || 'Failed to get chat response' });
  }
}
