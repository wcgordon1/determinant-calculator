import React from 'react';
import { jsPDF } from 'jspdf';

interface CertificateProps {
  name: string;
  score: number;
  totalQuestions: number;
}

export const Certificate: React.FC<CertificateProps> = ({ name, score, totalQuestions }) => {
  const percentage = (score / totalQuestions) * 100;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const downloadCertificate = () => {
    // Create new jsPDF instance
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    const contentHeight = pageHeight - (margin * 2);

    // Add border
    doc.setDrawColor(224, 204, 250); // primary-200
    doc.setLineWidth(1);
    doc.rect(margin, margin, contentWidth, contentHeight);

    // Add domain at the top
    doc.setFontSize(12);
    doc.setTextColor(107, 114, 128); // gray-600
    doc.text('determinantcalculator.com', pageWidth / 2, margin + 10, { align: 'center' });

    // Add title
    doc.setFontSize(36);
    doc.setTextColor(93, 33, 182); // primary-800
    doc.text('Certificate of Achievement', pageWidth / 2, margin + 35, { align: 'center' });

    // Calculate vertical center point
    const centerY = pageHeight / 2;

    // Add name section with better spacing
    doc.setFontSize(16);
    doc.setTextColor(107, 114, 128); // gray-600
    doc.text('This certifies that', pageWidth / 2, centerY - 25, { align: 'center' });

    // Add name
    doc.setFontSize(48);
    doc.setTextColor(109, 40, 217); // primary-700
    doc.text(name, pageWidth / 2, centerY, { align: 'center' });

    // Add completion text
    doc.setFontSize(16);
    doc.setTextColor(107, 114, 128);
    doc.text('has successfully completed the', pageWidth / 2, centerY + 25, { align: 'center' });

    // Add assessment name
    doc.setFontSize(24);
    doc.setTextColor(93, 33, 182);
    doc.text('Matrix Mathematics Assessment', pageWidth / 2, centerY + 40, { align: 'center' });

    // Add score
    doc.setFontSize(16);
    doc.setTextColor(107, 114, 128);
    doc.text(`with a score of ${score}/${totalQuestions} (${percentage.toFixed(1)}%)`, pageWidth / 2, centerY + 55, { align: 'center' });

    // Calculate bottom section Y position
    const bottomY = pageHeight - margin - 30;

    // Add signature lines
    doc.setDrawColor(156, 163, 175); // gray-400
    const signatureWidth = 50;
    const leftSignatureX = pageWidth / 4;
    const rightSignatureX = (pageWidth * 3) / 4;

    // Draw signature lines
    doc.line(leftSignatureX - signatureWidth/2, bottomY, leftSignatureX + signatureWidth/2, bottomY);
    doc.line(rightSignatureX - signatureWidth/2, bottomY, rightSignatureX + signatureWidth/2, bottomY);

    // Add signatures and date
    doc.setTextColor(93, 33, 182);
    doc.setFont('helvetica', 'italic');
    doc.text('Dr. Matrix Determinant', leftSignatureX, bottomY - 3, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128);
    doc.text('Matrix Mathematics Team', leftSignatureX, bottomY + 10, { align: 'center' });
    
    // Add date
    doc.text(currentDate, rightSignatureX, bottomY - 3, { align: 'center' });
    doc.text('Date', rightSignatureX, bottomY + 10, { align: 'center' });

    // Save the PDF
    doc.save(`${name.replace(/\s+/g, '_')}_matrix_certificate.pdf`);
  };

  return (
    <button
      onClick={downloadCertificate}
      className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
    >
      Save/Print Certificate
    </button>
  );
};