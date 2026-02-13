import { useState, useEffect } from 'react'

const API = 'http://localhost:5001/api/files'

function App() {
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const fetchFiles = async () => {
    try {
      const res = await fetch(API)
      const data = await res.json()
      setFiles(data)
    } catch (err) {
      console.error('Failed to fetch files:', err)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const handleUpload = async () => {
    if (!selectedFile) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const res = await fetch(API, { method: 'POST', body: formData })
      if (res.ok) {
        setSelectedFile(null)
        fetchFiles()
      } else {
        console.error('Upload failed:', res.statusText)
      }
    } catch (err) {
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleDownload = (name) => {
    window.open(`${API}/${encodeURIComponent(name)}`, '_blank')
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>File Storage POC</h1>
      <p style={{ color: '#666' }}>React → .NET Core Web API → In-Memory Store</p>

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
      </div>

      <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2>Stored Files</h2>
        {files.length === 0 ? (
          <p style={{ color: '#999' }}>No files uploaded yet.</p>
        ) : (
          <ul>
            {files.map((name) => (
              <li key={name} style={{ marginBottom: 4 }}>
                <button
                  onClick={() => handleDownload(name)}
                  style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={fetchFiles} style={{ marginTop: 8 }}>
          Refresh
        </button>
      </div>
    </div>
  )
}

export default App
