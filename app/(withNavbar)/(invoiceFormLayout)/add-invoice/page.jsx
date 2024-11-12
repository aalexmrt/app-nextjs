"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  addInvoice,
  getOrganization,
  getLastOrganizationInvoiceService,
  generateInvoicePdf,
} from "@/services/strapi";

import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";
import { InvoiceForm } from "@/app/ui/invoice-form";

const formSchema = z.object({
  identificationNumber: z.string().min(1, {
    message: "This is a required field",
  }),
  date: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "Please select a date and time!",
  }),
  customer: z.string().min(1, {
    message: "This is a required field",
  }),
  products: z.array(
    z.object({
      name: z.string(),
      quantity: z.coerce.number().int().optional(),
      price: z.coerce.number().int().optional(),
    })
  ),
  total: z.number(),
  organization: z.string().min(1, {
    message: "This is a required field",
  }),
  number: z.number(),
});

const InvoiceFormHandler = ({
  organizationCustomers,
  organization,
  nextInvoiceNumber,
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identificationNumber: `${organization.invoicePrefix}-${nextInvoiceNumber
        .toString()
        .padStart(3, "0")}`,
      number: nextInvoiceNumber,
      date: "",
      customer: "",
      products: Array(4).fill({
        name: "",
        quantity: "",
        price: "",
      }),
      total: 0,
      organization: organization.documentId,
    },
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // 2. Define a submit handler.
  async function onSubmit(values) {
    const { products } = values;
    let total = 0;
    for (const [index, product] of products.entries()) {
      if (
        product.name === "" ||
        product.quantity === 0 ||
        product.price === 0
      ) {
        products.splice(index);
        continue;
      }
      product.total = parseFloat(product.price) * parseFloat(product.quantity);
      total += product.total;
    }

    values.total = total;
    console.log(values);
    try {
      setLoading(true);
      const invoice = await addInvoice(values);
      await generateInvoicePdf(invoice.id, invoice.documentId);
      toast({
        description: "Invoice added successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        description: "An error occurred while exporting the PDF.",
        variant: "destructive",
      });
      return;
    } finally {
      setLoading(false);
    }
  }

  return (
    <InvoiceForm {...{ form, organizationCustomers, onSubmit, loading }} />
  );
};

export default function Page() {
  const [organizationCustomers, setOrganizationCustomers] = useState([]);
  const [organization, setOrganization] = useState({});
  const [lastInvoice, setLastInvoice] = useState({});

  useEffect(() => {
    const getGlobalOrganization = async () => {
      const response = await getOrganization();

      setOrganization(response);
    };
    getGlobalOrganization();
  }, []);

  useEffect(() => {
    const getLastOrganizationInvoice = async () => {
      const response = await getLastOrganizationInvoiceService(
        organization.documentId
      );
      setLastInvoice(response);
    };
    getLastOrganizationInvoice();
  }, [organization]);

  useEffect(() => {
    if (organization.customers) {
      setOrganizationCustomers(organization.customers);
    }
  }, [organization]);

  const isLastInvoiceReady = !!lastInvoice;
  const isOrganizationReady = !!organization;
  const isCustomersReady =
    !!organizationCustomers && organizationCustomers.length;
  const nextInvoiceNumber =
    isLastInvoiceReady && Number(lastInvoice.number) + 1;

  return nextInvoiceNumber && isOrganizationReady && isCustomersReady ? (
    <InvoiceFormHandler
      {...{ organizationCustomers, organization, nextInvoiceNumber }}
    />
  ) : (
    <div className="flex justify-center">
      <Spinner />
    </div>
  );
}
