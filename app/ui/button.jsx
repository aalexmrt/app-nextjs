"use client";

import { useExportPdf } from "@/hooks/use-export-pdf";
import { useToast } from "@/hooks/use-toast";
import { RxDownload } from "react-icons/rx";
export const ExportPdfButton = ({ documentId }) => {
  const { exportPdf } = useExportPdf();



  const {toast} = useToast();
  return (
    <button onClick={() => {
      exportPdf(`hidden-invoice/${documentId}`)
      toast({
        description: "Downloading pdf, it may take a few seconds",
      })
    }}>
      <RxDownload />
    </button>
  );
};
