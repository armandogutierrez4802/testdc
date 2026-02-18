const BASE = 'http://localhost:5001/api/files';

export async function fetchFiles() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to fetch files');
  return res.json();
}

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(BASE, { method: 'POST', body: formData });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

export function getFileDownloadUrl(name) {
  return `${BASE}/${encodeURIComponent(name)}`;
}
