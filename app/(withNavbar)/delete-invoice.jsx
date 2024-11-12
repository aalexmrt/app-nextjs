"use client";

import { deleteInvoice } from "@/services/strapi";
export const DeleteInvoice = ({ documentId }) => {
  const _deleteInvoice = async (documentId) => {
    try {
      await deleteInvoice(documentId);
      // toast({
      //   description: "Invoice deleted successfully",
      //   variant: "success",
      // });
    } catch (error) {
      // toast({
      //   description: "An error occurred while deleting the invoice",
      //   variant: "destructive",
      // });
    }
  };

  return (
    <button className="text-red-500" onClick={() => _deleteInvoice(documentId)}>
      Delete
    </button>
  );
};
