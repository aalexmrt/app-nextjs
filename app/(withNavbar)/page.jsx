"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import axios from "axios";

import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteInvoice } from "./delete-invoice";

import {
  getInvoicesList,
  getOrganization,
  sendInvoiceEmail,
} from "@/services/strapi";

import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { Button, buttonVariants } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { DeleteInvoice } from "./delete-invoice";

// import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { Form } from "react-hook-form";
import { FormControl } from "@/components/ui/form";
import useSWR, { mutate } from "swr";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { CardHeader } from "@mui/material";

export default function Page() {
  const [organization, setOrganization] = useState({});
  const [loadingSendEmail, setLoadingSendEmail] = useState(false);

  const [selectedInvoices, setSelectedInvoices] = useState([]);

  const { data, isLoading, error } = useSWR(
    "globalOrganization",
    getOrganization
  );
  const organizationDocumentId = data?.documentId;
  console.log(organizationDocumentId);

  const {
    data: invoicesData,
    isLoading: invoicesLoading,
    error: invoicesError,
  } = useSWR([organizationDocumentId, "/api/invoices"], () =>
    getInvoicesList(organizationDocumentId)
  );

  const invoices = invoicesData?.data;

  const { toast } = useToast();

  const handleMutation = () => {
    mutate([organizationDocumentId, "/api/invoices"]);
  };

  const prepareInvoicesForEmail = useCallback(async () => {
    const invoicesForEmail = invoices
      .filter((invoice) => selectedInvoices.includes(invoice.documentId))
      .map((invoice) => ({
        identificationNumber: invoice.identificationNumber,
        documentId: invoice.documentId,
        customerDocumentId: invoice.customer.documentId,
        customerName: invoice.customer.name,
        customerEmail: invoice.customer.email,
        organizationName: invoice.organization.name,
        pdf: invoice.pdf.url,
      }));

    invoicesForEmail.sort((a, b) =>
      a.customerDocumentId.localeCompare(b.customerDocumentId)
    );

    let emailStageArea = [];
    let invoicesPdfList = [];
    let currentCustomer = "";
    for (let i = 0; i < invoicesForEmail.length; i++) {
      currentCustomer = invoicesForEmail[i].customerDocumentId;
      emailStageArea.push(invoicesForEmail[i]);

      invoicesPdfList.push({
        filename: `${invoicesForEmail[i].identificationNumber}.pdf`,
        contentUrl: invoicesForEmail[i].pdf,
      });

      if (currentCustomer !== invoicesForEmail[i + 1]?.customerDocumentId) {
        try {
          setLoadingSendEmail(true);
          await sendInvoiceEmail(invoicesForEmail[i], invoicesPdfList);
          toast({
            description: `Email sent to ${invoicesForEmail[i].customerName}`,
            variant: "success",
          });
        } catch (error) {
          toast({
            description: `An error occurred while sending the email to ${invoicesForEmail[i].customerName}`,
            variant: "destructive",
          });
        } finally {
          setLoadingSendEmail(false);
          setSelectedInvoices([]);
        }
        // reset stage area
        emailStageArea = [];
        invoicesPdfList = [];
      }
    }
  }, [invoices, selectedInvoices, setLoadingSendEmail, toast]);

  const handleCheckboxChange = (documentId) => {
    if (documentId === "select-all") {
      setSelectedInvoices((prevSelected) =>
        invoices.map((invoice) => prevSelected.includes(invoice.documentId))
      );
      return;
    }
    setSelectedInvoices((prevSelected) =>
      prevSelected.includes(documentId)
        ? prevSelected.filter((id) => id !== documentId)
        : [...prevSelected, documentId]
    );
  };

  const selectAll = () => {
    if (selectedInvoices.length === invoices.length) {
      setSelectedInvoices([]);
      return;
    }
    setSelectedInvoices(invoices.map((invoice) => invoice.documentId));
  };
  console.log(invoices);
  return (
    <div className="flex flex-col items-center w-[800px] gap-4">
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Command>
              {/* <CommandInput placeholder="Search..." /> */}
              <CommandList>
                {/* <CommandEmpty>No results found.</CommandEmpty> */}
                {/* <CommandGroup heading="Suggestions">
                  <CommandItem>Calendar</CommandItem>
                  <CommandItem>Search Emoji</CommandItem>
                  <CommandItem>Calculator</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>Profile</CommandItem>
                  <CommandItem>Billing</CommandItem>
                  <CommandItem>Settings</CommandItem>
                </CommandGroup> */}
              </CommandList>
            </Command>
            <Link
              href="/add-invoice"
              className={buttonVariants({ variant: "outline" })}
            >
              Add Invoice
            </Link>

            <Button
              disabled={
                (selectedInvoices && selectedInvoices.length === 0) ||
                loadingSendEmail
              }
              onClick={prepareInvoicesForEmail}
            >
              Send
            </Button>

            {/* <div>Add customer</div>
            <div>Refresh (future)</div> */}
          </div>
        </CardContent>
      </Card>
      <form onSubmit={(e) => e.preventDefault()}>
        <Card className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">
                  {invoices && invoices.length > 0 && (
                    <Checkbox
                      name="select-all"
                      value={selectedInvoices.length === invoices.length}
                      checked={selectedInvoices.length === invoices.length}
                      onCheckedChange={selectAll}
                      aria-label="Select all"
                    />
                  )}
                </TableHead>
                <TableHead className="w-[200px] font-bold">Invoice</TableHead>
                <TableHead className="w-[200px] font-bold">Date</TableHead>
                <TableHead className="w-[200px] font-bold">Customer</TableHead>
                <TableHead className="w-[200px] font-bold">Amount</TableHead>
                <TableHead className=" font-bold"></TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </Card>

        <Card className="mt-4">
          <Table>
            <TableBody>
              {invoices && invoices && invoices.length > 0 ? (
                invoices.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="">
                      <Checkbox
                        name={item.documentId}
                        value={item.documentId}
                        checked={selectedInvoices.includes(item.documentId)}
                        onCheckedChange={() =>
                          handleCheckboxChange(item.documentId)
                        }
                        aria-label="Select row"
                      />
                    </TableCell>
                    <TableCell className="w-[200px]">
                      {item.identificationNumber}
                    </TableCell>
                    <TableCell className="w-[200px]">{item.date}</TableCell>
                    <TableCell className="w-[200px]">
                      {item.customer?.name}
                    </TableCell>
                    <TableCell className="w-[200px]">$ {item.total}</TableCell>

                    <TableCell className="">
                      <div>
                        <Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <BsThreeDotsVertical />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <DialogTrigger>View</DialogTrigger>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link href={`/edit-invoice/${item.documentId}`}>
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <DeleteInvoice
                                  documentId={item.documentId}
                                  handleMutation={handleMutation}
                                />
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <DialogContent className="sm:max-w-[1400px] sm:max-h-[1000px] w-full h-full p-5">
                            <DialogHeader>
                              <DialogTitle></DialogTitle>
                              <DialogDescription></DialogDescription>
                            </DialogHeader>

                            <iframe
                              src={item.pdf?.url}
                              width="100%"
                              height="800px"
                            ></iframe>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="5" className="font-medium ">
                    No invoices found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </form>
    </div>
  );
}
