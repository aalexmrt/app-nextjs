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
      const response = await exportPdfAPI(dashboardUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
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
