import React, { useState } from "react";

export default function FileUploader({ title, endpoint, onResult, setProgress, setLoading }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(10);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: "POST",
        body: formData,
      });

      setProgress(70);

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setProgress(100);
      onResult(data);
    } catch (err) {
      setError("Failed to upload or process the file.");
      setProgress(0);
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border p-4 shadow bg-white w-full max-w-2xl mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={handleFileChange}
        className="block w-full mb-4 border border-gray-300 p-2 rounded"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={!file}
      >
        Upload
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
