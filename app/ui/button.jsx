"use client";

import { useExportPdf } from "@/hooks/use-export-pdf";
import { RxDownload } from "react-icons/rx";
export const ExportPdfButton = ({ documentId }) => {
  const { exportPdf } = useExportPdf();
  return (
    <button onClick={() => exportPdf(`hidden-invoice/${documentId}`)}>
      <RxDownload />
    </button>
  );
};
