"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { IoAdd } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

import { getInvoicesList, getOrganization } from "@/services/strapi";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button, buttonVariants } from "@/components/ui/button";
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

export default function Page() {
  const [organization, setOrganization] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState([]);

  const handleCheckboxChange = (documentId) => {
    setSelectedInvoices((prevSelected) =>
      prevSelected.includes(documentId)
        ? prevSelected.filter((id) => id !== documentId)
        : [...prevSelected, documentId]
    );
  };

  useEffect(() => {
    const getGlobalOrganization = async () => {
      const response = await getOrganization();

      setOrganization(response);
    };
    getGlobalOrganization();
  }, []);

  useEffect(() => {
    const getInvoices = async () => {
      const response = await getInvoicesList(organization.documentId);
      setInvoices(response);
    };
    getInvoices();
  }, [organization]);

  return (
    <>
      <form>
        <div className="mt-8 mb-4 gap-3 flex justify-end">
          {selectedInvoices && selectedInvoices.length > 0 && (
            <Button type="submit">Send</Button>
          )}
          <Link
            href="add-invoice"
            className={buttonVariants({ variant: "outline" })}
          >
            <IoAdd className="mr-2 " />
            Add Invoice
          </Link>
        </div>
        <Card>
          <CardContent className="p-0">
            <Table className="px-4">
              <TableHeader className="bg-gray-50 px-4">
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead className="w-[200px] font-bold">Invoice</TableHead>
                  <TableHead className="font-bold text-center">Date</TableHead>
                  <TableHead className="font-bold text-center">
                    Customer
                  </TableHead>
                  <TableHead className="font-bold text-right">Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {invoices && invoices.data && invoices.data.length > 0 ? (
                  invoices.data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          name={item.documentId}
                          value={item.documentId}
                          checked={selectedInvoices.includes(item.documentId)}
                          onCheckedChange={() =>
                            handleCheckboxChange(item.documentId)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.identificationNumber}
                      </TableCell>
                      <TableCell className="text-center">{item.date}</TableCell>
                      <TableCell className="text-center">
                        {item.customer?.name}
                      </TableCell>
                      <TableCell className="text-right">
                        $ {item.total}
                      </TableCell>
                      <TableCell className="w-2 pt-5 gap-2 align-middle">
                        <div>
                          <Dialog>
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <BsThreeDotsVertical className="h-full" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <DialogTrigger>View</DialogTrigger>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Link
                                    href={`/edit-invoice/${item.documentId}`}
                                  >
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <DeleteInvoice documentId={item.documentId} />
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
                    <TableCell colSpan="5" className="font-medium text-center">
                      No invoices found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </form>
    </>
  );
}
