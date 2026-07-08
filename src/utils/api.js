const BASE = '';

export async function getOutfitSuggestions(intakeData) {
  const res = await fetch(`${BASE}/api/style`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(intakeData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to get outfit suggestions');
  return data;
}

export async function sendChatMessage(message, history, intakeData) {
  const res = await fetch(`${BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, intakeData }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to get chat response');
  return data.reply;
}
