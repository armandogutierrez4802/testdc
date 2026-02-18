export default function NoteList({ notes, onSelect, onRefresh }) {
  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: 8, marginBottom: '2rem' }}>
      <h2>Saved Notes</h2>
      {notes.length === 0 ? (
        <p style={{ color: '#999' }}>No notes saved yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notes.map((note) => (
            <li key={note.id} style={{ marginBottom: 8 }}>
              <button
                onClick={() => onSelect(note.id)}
                style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: '1em' }}
              >
                {note.title}
              </button>
              <span style={{ color: '#999', fontSize: '0.85em', marginLeft: 8 }}>
                {new Date(note.savedAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onRefresh} style={{ marginTop: 8 }}>Refresh</button>
    </div>
  );
}
