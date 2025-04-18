import jsPDF from 'jspdf';

function onDownload() {
  const doc = new jsPDF();
  doc.text("Report Summary", 10, 10);
  doc.text(`Type: ${result.report_type}`, 10, 20);
  doc.text(`Diagnosis: ${result.diagnosis}`, 10, 30);
  doc.text(`Summary: ${result.text_summary}`, 10, 40);
  doc.save("medscope_report.pdf");
}

export default onDownload