import { useState } from 'react';
import { uploadFile } from '../api/filesApi';

export default function FileUpload({ onUploaded }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setError(null);
    try {
      await uploadFile(selectedFile);
      setSelectedFile(null);
      onUploaded();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Upload a File</h2>
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        style={{ marginLeft: 8 }}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
    </div>
  );
}
