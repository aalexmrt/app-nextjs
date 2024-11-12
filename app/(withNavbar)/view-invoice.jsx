"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getInvoicePdfUrl } from "@/services/strapi";
import { Button } from "@/components/ui/button";

export const ViewInvoice = () => {
  console.log(open, "open");
  // const [invoice, setInvoice] = useState({});
  // useEffect(() => {
  //   getInvoicePdfUrl(documentId).then((data) => {
  //     setInvoice(data);
  //   });
  // }, [documentId]);
  // console.log(invoice);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>View</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invoice</DialogTitle>
          <DialogDescription>View invoice details</DialogDescription>
        </DialogHeader>

        <h1>Invoice</h1>
        {/* <iframe src={invoice.pdf?.url} width="100%" height="800px"></iframe> */}
      </DialogContent>
    </Dialog>
  );
};
