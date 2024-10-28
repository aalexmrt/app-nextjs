import HeaderDashboard from "../ui/header-dashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getInvoicesList } from "@/services/strapi";
import { buttonVariants } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ExportPdfButton } from "../ui/button";

export default async function Page() {
  const invoices = await getInvoicesList();

  return (
    <>
      <HeaderDashboard />
      <div className="mt-8 mb-4 flex justify-end">
        <Link
          href="add-invoice"
          className={buttonVariants({ variant: "outline" })}
        >
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
              {invoices &&
                invoices.data.length > 0 &&
                invoices.data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.identificationNumber}
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.customer?.name}</TableCell>

                    {/* <TableCell>{item.status}</TableCell>
                  <TableCell>{item.method}</TableCell> */}
                    <TableCell className="text-right">{item.total}</TableCell>
                    <TableCell className="text-right">
                      <ExportPdfButton documentId={item.documentId} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
