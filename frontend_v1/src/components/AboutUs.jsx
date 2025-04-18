import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#F9F8FA] flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-extrabold text-[#FF4C29] mb-6 text-center">
          About MedScope.AI
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          <strong>MedScope.AI</strong> is an AI-powered medical report analyzer designed
          to make patient care smarter and more efficient. With just a single
          upload, users can instantly summarize complex medical documents, lab
          reports, and even medical imaging data — all in a secure and
          user-friendly platform.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Our mission is to empower doctors, patients, and researchers by
          making medical data more accessible and understandable through the
          power of artificial intelligence.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed">
          Built with modern technologies and privacy-first architecture,
          MedScope.AI aims to reduce interpretation errors, improve diagnostic
          workflows, and accelerate healthcare delivery across the globe.
        </p>
      </div>
    </div>
  );
}
