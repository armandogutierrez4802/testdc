import { useState } from 'react';
import { saveNote } from '../api/notesApi';

export default function NoteForm({ onSaved }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    setError(null);
    try {
      await saveNote({ title, content });
      setTitle('');
      setContent('');
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>New Note</h2>
      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '0.4rem', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          style={{ width: '100%', padding: '0.4rem', boxSizing: 'border-box', resize: 'vertical' }}
        />
      </div>
      <button onClick={handleSave} disabled={!title.trim() || !content.trim() || saving}>
        {saving ? 'Saving...' : 'Save Note'}
      </button>
      {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
    </div>
  );
}
