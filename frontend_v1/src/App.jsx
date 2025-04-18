import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Auth from "./components/Auth";
import ResultDisplay from "./components/ResultDisplay";
import MultiFileUploader from "./components/MultiFileUploader";
import LoadingScreen from "./components/LoadingScreen";

import jsPDF from "jspdf";
import { useEffect } from "react";

// inside App component


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const resetHandler = () => {
      setResults([]);
      setCurrentPage(0);
    };
  
    window.addEventListener("resetResults", resetHandler);
  
    return () => {
      window.removeEventListener("resetResults", resetHandler);
    };
  }, []);
  const handleAuthSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const currentResult = results[currentPage];

  const handleDownload = (type, result) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor(255, 76, 41);
    doc.text("🏥 MedScope.AI - Diagnostic Report", 10, 15);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Report Type: ${type}`, 10, 30);
    doc.text(`File: ${result.filename || "unknown"}`, 10, 40);
    doc.text(`Diagnosis: ${result.diagnosis}`, 10, 50);

    if (result.text_summary) {
      const lines = doc.splitTextToSize(result.text_summary, 180);
      doc.text("Summary:", 10, 60);
      doc.text(lines, 10, 70);
    }

    doc.text("Page 1", 180, 290);
    doc.save(`medscope_${type}_${result.filename || "report"}.pdf`);
  };

  const handleDownloadAll = () => {
    const doc = new jsPDF();

    results.forEach(({ report_type, ...result }, idx) => {
      doc.setFontSize(16);
      doc.setTextColor(255, 76, 41);
      doc.text("🏥 MedScope.AI - Diagnostic Report", 10, 15);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Report Type: ${report_type}`, 10, 30);
      doc.text(`File: ${result.filename || "unknown"}`, 10, 40);
      doc.text(`Diagnosis: ${result.diagnosis}`, 10, 50);

      if (result.text_summary) {
        const lines = doc.splitTextToSize(result.text_summary, 180);
        doc.text("Summary:", 10, 60);
        doc.text(lines, 10, 70);
      }

      doc.setFontSize(10);
      doc.text(`Page ${idx + 1}`, 180, 290);

      if (idx < results.length - 1) {
        doc.addPage();
      }
    });

    doc.save("MedScope_Combined_Report.pdf");
  };

  return (
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} setPage={setPage} />

      {!isAuthenticated ? (
        <Auth onAuthSuccess={handleAuthSuccess} />
      ) : loading ? (
        <LoadingScreen progress={progress} />
      ) : results.length > 0 ? (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
          {currentResult && (
            <>
              <ResultDisplay
                result={currentResult}
                onBack={() => {
                  setResults([]);
                  setCurrentPage(0);
                }}
                onDownload={() =>
                  handleDownload(currentResult.report_type, currentResult)
                }
              />

              <div className="result-actions flex justify-between mt-6">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                  disabled={currentPage === 0}
                  className="px-6 py-3 bg-[#FF4C29] text-white rounded-full font-bold disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={handleDownloadAll}
                  className="px-6 py-3 bg-[#FF4C29] text-white rounded-full font-bold"
                >
                  Download All Reports
                </button>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, results.length - 1))
                  }
                  disabled={currentPage === results.length - 1}
                  className="px-6 py-3 bg-[#FF4C29] text-white rounded-full font-bold disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      ) : page === "about" ? (
        <AboutUs />
      ) : page === "contact" ? (
        <ContactUs />
      ) : (
        <div className="w-full px-6 py-10">
          {loading && (
            <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden mb-6 max-w-xl mx-auto">
              <div
                className="bg-[#FF4C29] h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          <MultiFileUploader
            onResults={(data) => {
              const flat = [];
              Object.entries(data).forEach(([type, value]) => {
                if (Array.isArray(value)) {
                  value.forEach((report) =>
                    flat.push({ ...report, report_type: type })
                  );
                } else if (value?.reports) {
                  value.reports.forEach((report) =>
                    flat.push({ ...report, report_type: value.report_type || type })
                  );
                } else {
                  flat.push({ ...value, report_type: type });
                }
              });
              setResults(flat);
              setCurrentPage(0);
            }}
            setLoading={setLoading}
            setProgress={setProgress}
          />
        </div>
      )}
    </div>
  );
}
