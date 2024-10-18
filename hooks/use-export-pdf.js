import { useState } from "react";

import { exportPdfAPI } from "@/services/export-pdf";
import { useToast } from "./use-toast";

const useExportPdf = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const exportPdf = async (dashboardUrl) => {
    try {
      setLoading(true);
      const pdfArrayBuffer = await exportPdfAPI(dashboardUrl); // This must be using responseType: 'arraybuffer'

      const pdfBlob = new Blob([new Uint8Array(pdfArrayBuffer)], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "dashboard.pdf");
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError(error);
      toast({
        description: "An error occurred while exporting the PDF.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    exportPdf,
    loading,
    error,
  };
};

export { useExportPdf };
