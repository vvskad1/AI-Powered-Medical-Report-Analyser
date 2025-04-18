import React from "react";

export default function ResultDisplay({ result, onBack, onDownload }) {
  const {
    report_type = "report",
    filename,
    diagnosis,
    text_summary,
    image_heatmap,
  } = result;

  return (
    <div className="result-container space-y-6 max-w-4xl pt-24">
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> < br /><br/><br /><br /><br />
      <h2 className="text-2xl font-bold text-center text-[#1f2937]">
        Results for {report_type.replace(/_/g, " ").toUpperCase()}
      </h2>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-[#FF4C29] text-center mb-2">
          {filename || "Report"}
        </h3>

        <p className="text-gray-700 text-center">
          <strong>Diagnosis:</strong> {diagnosis}
        </p>

        {text_summary && (
          <div className="mt-4 text-gray-800 whitespace-pre-line leading-relaxed text-justify">
            <strong>Summary:</strong>
            <p className="mt-1">{text_summary}</p>
          </div>
        )}

        {image_heatmap && (
          <div className="mt-4 flex justify-center">
            <img
              src={`data:image/png;base64,${image_heatmap}`}
              alt="Heatmap"
              className="max-w-md rounded shadow"
            />
          </div>
        )}
      </div>
     
<br />
    </div>
  );
}
