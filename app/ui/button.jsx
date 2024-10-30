"use client";

import { useExportPdf } from "@/hooks/use-export-pdf";
import { useToast } from "@/hooks/use-toast";
import { RxDownload } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";

export const EditInvoiceButton = ({ documentId }) => {
  return (
    <Link
      href={`edit-invoice/${documentId}`}
      // className={buttonVariants({ variant: "outline" })}
    >
      <CiEdit />
    </Link>
  );
};
export const ExportPdfButton = ({ documentId }) => {
  const { exportPdf } = useExportPdf();

  const { toast } = useToast();
  return (
    <button
      onClick={() => {
        exportPdf(`hidden-invoice/${documentId}`);
        toast({
          description: "Downloading pdf, it may take a few seconds",
        });
      }}
    >
      <RxDownload />
    </button>
  );
};
