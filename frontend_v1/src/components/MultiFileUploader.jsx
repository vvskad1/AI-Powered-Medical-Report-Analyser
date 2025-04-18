import React, { useRef, useState } from "react";
import "./MultiFileUploader.css";
import {
  ClipboardDocumentIcon,
  BeakerIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";

const reportTypes = [
  {
    key: "medical",
    label: "Medical Report",
    bgClass: "medical-card",
    icon: ClipboardDocumentIcon,
  },
  {
    key: "test",
    label: "Test Report",
    bgClass: "test-card",
    icon: BeakerIcon,
  },
  {
    key: "image",
    label: "MRI / CT / X-Ray",
    bgClass: "image-card",
    icon: PhotoIcon,
  },
];

export default function MultiFileUploader({ onResults, setLoading, setProgress }) {
  const [files, setFiles] = useState({ medical: [], test: [], image: [] });
  const fileInputs = useRef({});

  const handleFileChange = (type, fileList) => {
    setFiles((prev) => ({
      ...prev,
      [type]: Array.from(fileList),
    }));
  };

  const triggerFileInput = (key) => {
    fileInputs.current[key]?.click();
  };

  const handleUpload = async () => {
    setLoading(true);
    setProgress(10);

    const endpoints = {
      medical: "/upload/medical-report",
      test: "/upload/test-report",
      image: "/upload/image",
    };

    const results = {};
    const reportTypesToUpload = Object.keys(files).filter((key) => files[key]?.length > 0);
    let uploaded = 0;

    for (const type of reportTypesToUpload) {
      const formData = new FormData();
      files[type].forEach((file) => formData.append("files", file));

      try {
        const res = await fetch(`http://localhost:8000${endpoints[type]}`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        results[type] = data;
      } catch (err) {
        results[type] = { error: "Failed to upload" };
      }

      uploaded++;
      setProgress(Math.round((uploaded / reportTypesToUpload.length) * 100));
    }

    setLoading(false);
    onResults(results);
  };

  const atLeastOneSelected = Object.values(files).some((f) => f.length > 0);

  return (
    <div className="multi-upload-container">
      <br /><br /><br /><br />
      <h2 className="text-sm text-center text-gray-700 mt-1">Click to Upload Files</h2>
      <div className="card-grid">
        {reportTypes.map(({ key, label, bgClass, icon: Icon }) => (
          <div
            key={key}
            className={`upload-card ${bgClass}`}
            onClick={() => triggerFileInput(key)}
          >
            <Icon className="h-50 w-50 mb-3 text-[#1f2937]" />
            <h4 className="text-base font-bold text-center text-[#1f2937]">
              {label}
            </h4>
            <p className="text-xs text-center mt-2 text-gray-600">
  {files[key]?.length > 0
    ? files[key].map((f) => f.name).join(", ")
    : "No files selected"}
</p>

            <input
              type="file"
              ref={(el) => (fileInputs.current[key] = el)}
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => handleFileChange(key, e.target.files)}
              className="file-hidden"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleUpload}
        disabled={!atLeastOneSelected}
        className="submit-btn"
      >
        Submit Reports
      </button>
    </div>
  );
}
