import React from "react";
import {
  ClipboardDocumentIcon,
  BeakerIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import "./ReportSelector.css";

export default function ReportSelector({ selected, setSelected }) {
  const toggle = (type) => {
    if (selected.includes(type)) {
      setSelected(selected.filter((t) => t !== type));
    } else {
      setSelected([...selected, type]);
    }
  };

  return (
    <div className="report-selector-container">
      <div
        className={`report-card ${selected.includes("medical") ? "active" : ""} bg-orange`}
        onClick={() => toggle("medical")}
      >
        <ClipboardDocumentIcon className="report-icon text-orange" />
        <p className="report-label text-orange">Medical Report</p>
      </div>

      <div
        className={`report-card ${selected.includes("test") ? "active" : ""} bg-blue`}
        onClick={() => toggle("test")}
      >
        <BeakerIcon className="report-icon text-blue" />
        <p className="report-label text-blue">Test Report</p>
      </div>

      <div
        className={`report-card ${selected.includes("image") ? "active" : ""} bg-green`}
        onClick={() => toggle("image")}
      >
        <PhotoIcon className="report-icon text-green" />
        <p className="report-label text-green">MRI / CT / X-Ray</p>
      </div>
    </div>
  );
}
