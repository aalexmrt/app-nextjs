"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const ViewInvoice = ({ showViewInvoice, setShowViewInvoice }) => {
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
