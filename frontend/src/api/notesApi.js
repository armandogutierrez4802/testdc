const BASE = 'http://localhost:5001/api/notes';

export async function fetchNotes() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
}

export async function fetchNote(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch note');
  return res.json();
}

export async function saveNote({ title, content }) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error('Failed to save note');
  return res.json();
}
