import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, history, intakeData } = req.body;

  const githubToken = process.env.GITHUB;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (!githubToken && (!anthropicKey || anthropicKey === 'your_anthropic_api_key_here')) {
    return res.status(500).json({ error: 'Please configure GITHUB or ANTHROPIC_API_KEY in your .env file.' });
  }

  try {
    const systemPrompt = `You are Zylora, a warm, expert AI fashion stylist. You already know this client's profile:
- Gender Preference: ${intakeData.gender}
- Body Type: ${intakeData.bodyType}
- Skin Tone: ${intakeData.skinTone}
- Occasion: ${intakeData.occasion}
- Budget: ${intakeData.budget}
- Style Preferences: ${intakeData.stylePreferences || 'None specified'}

You've already suggested outfits for them. Now answer their follow-up styling questions in a warm, conversational, expert tone. Be specific, actionable, and always keep their profile in mind. Use INR (₹) for any price references. Keep responses concise — 2-4 sentences unless more detail is genuinely needed.`;

    let reply;
    if (githubToken) {
      const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${githubToken}`
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            ...history.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: message }
          ],
          model: 'gpt-4o-mini',
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GitHub Models API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      reply = result.choices[0].message.content;
    } else {
      const client = new Anthropic({ apiKey: anthropicKey });
      const response = await client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          ...history.map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: message }
        ]
      });
      reply = response.content[0].text;
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat API error:', err);
    return res.status(500).json({ error: err.message || 'Failed to get chat response' });
  }
}
