import { useState, useEffect } from 'react';
import { fetchNote } from '../api/notesApi';

export default function NoteViewer({ noteId, onClose }) {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!noteId) return;
    setLoading(true);
    setError(null);
    fetchNote(noteId)
      .then(setNote)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [noteId]);

  if (!noteId) return null;

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: 8, marginBottom: '2rem' }}>
      <button onClick={onClose} style={{ marginBottom: 12 }}>← Back</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {note && (
        <>
          <h2>{note.title}</h2>
          <p style={{ color: '#999', fontSize: '0.85em' }}>
            {new Date(note.savedAt).toLocaleString()}
          </p>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>
            {note.content}
          </pre>
        </>
      )}
    </div>
  );
}
