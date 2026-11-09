import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download, Loader2 } from 'lucide-react';
import { CVPdfDocument } from '../pdf/CVPdfDocument';
import type { CVData } from '../../types/cv';

interface DownloadButtonProps {
  data: CVData;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cleanName = data.contact.fullName
    ? data.contact.fullName.trim().replace(/\s+/g, '_')
    : 'Resume';
  const fileName = `${cleanName}_CV.pdf`;

  if (!isClient) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-olive-700 opacity-60 rounded-md cursor-not-allowed"
      >
        <Download className="w-4 h-4" />
        Download PDF
      </button>
    );
  }

  return (
    <div className="inline-flex items-center">
      <PDFDownloadLink
        document={<CVPdfDocument data={data} />}
        fileName={fileName}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-olive-700 hover:bg-olive-800 rounded-md transition-colors cursor-pointer select-none"
      >
        {({ loading, error }) => {
          if (loading) {
            return (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Compiling ATS PDF...</span>
              </>
            );
          }
          if (error) {
            return (
              <>
                <Download className="w-4 h-4" />
                <span>Retry Download</span>
              </>
            );
          }
          return (
            <>
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </>
          );
        }}
      </PDFDownloadLink>
    </div>
  );
};
