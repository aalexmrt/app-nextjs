"use client";
import { useState, useEffect } from "react";
import { getInvoice } from "@/services/strapi";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaEye } from "react-icons/fa";

export const ViewInvoiceButton = ({ documentId }) => {
  const [invoice, setInvoice] = useState({});
  const [show, setShow] = useState(false);
  useEffect(() => {
    getInvoice(documentId).then((data) => {
      setInvoice(data);
    });
  }, [documentId]);

  if (!invoice.pdf) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="sm:max-w-[1400px] sm:max-h-[1000px] w-full h-full p-8">
          <iframe
            src={invoice.pdf.url}
            className="w-full h-full"
            width="100%"
            height="100%"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
