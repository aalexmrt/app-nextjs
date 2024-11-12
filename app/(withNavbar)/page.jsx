"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoAdd } from "react-icons/io5";

import { getInvoicesList, getOrganization } from "@/services/strapi";
import { buttonVariants } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DeleteInvoice } from "./delete-invoice";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Page() {
  const [organization, setOrganization] = useState({});
  const [invoices, setInvoices] = useState([]);

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
      {/* <HeaderDashboard /> */}
      <div className="mt-8 mb-4 flex justify-end">
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
                <TableHead className="w-[200px] font-bold">Invoice</TableHead>
                <TableHead className="font-bold">Date</TableHead>
                <TableHead className="font-bold">Customer</TableHead>
                <TableHead className="font-bold text-right">Amount</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices && invoices.data && invoices.data.length > 0 ? (
                invoices.data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.identificationNumber}
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.customer?.name}</TableCell>
                    <TableCell className="text-right">$ {item.total}</TableCell>
                    <TableCell className="w-3 text-right flex gap-2 align-baseline">
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
                              <Link href={`/edit-invoice/${item.documentId}`}>
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
    </>
  );
}
