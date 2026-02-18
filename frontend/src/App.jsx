import { useState, useEffect } from 'react';
import { fetchFiles } from './api/filesApi';
import { fetchNotes } from './api/notesApi';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import NoteViewer from './components/NoteViewer';

function App() {
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const loadFiles = () => fetchFiles().then(setFiles).catch(console.error);
  const loadNotes = () => fetchNotes().then(setNotes).catch(console.error);

  useEffect(() => {
    loadFiles();
    loadNotes();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Storage POC</h1>
      <p style={{ color: '#666' }}>React → .NET Core Web API → In-Memory Store</p>

      <FileUpload onUploaded={loadFiles} />
      <FileList files={files} onRefresh={loadFiles} />

      <NoteForm onSaved={loadNotes} />
      {selectedNoteId ? (
        <NoteViewer noteId={selectedNoteId} onClose={() => setSelectedNoteId(null)} />
      ) : (
        <NoteList notes={notes} onSelect={setSelectedNoteId} onRefresh={loadNotes} />
      )}
    </div>
  );
}

export default App;
