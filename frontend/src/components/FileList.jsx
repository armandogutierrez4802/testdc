import { getFileDownloadUrl } from '../api/filesApi';

export default function FileList({ files, onRefresh }) {
  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: 8, marginBottom: '2rem' }}>
      <h2>Stored Files</h2>
      {files.length === 0 ? (
        <p style={{ color: '#999' }}>No files uploaded yet.</p>
      ) : (
        <ul>
          {files.map((name) => (
            <li key={name} style={{ marginBottom: 4 }}>
              <a
                href={getFileDownloadUrl(name)}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#0066cc' }}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onRefresh} style={{ marginTop: 8 }}>Refresh</button>
    </div>
  );
}
