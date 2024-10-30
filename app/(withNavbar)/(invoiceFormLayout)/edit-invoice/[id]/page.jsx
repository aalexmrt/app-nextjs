"use client";
import { getInvoice } from "@/services/strapi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { updateInvoice } from "@/services/strapi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
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

function InvoiceForm({ invoice, organizationCustomers }) {
  const { toast } = useToast();

  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      identificationNumber: invoice.identificationNumber,
      date: new Date(invoice.date),
      customer: invoice.customer.documentId,
      products: invoice.products,
      total: invoice.total,
      organization: invoice.organization.documentId,
      number: Number(invoice.number),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log(values);
    const { products } = values;
    let total = 0;
    for (const [index, product] of products.entries()) {
      console.log(product);
      if (
        product.name === "" ||
        product.quantity === 0 ||
        product.price === 0
      ) {
        console.log("splice");
        products.splice(index);
        continue;
      }
      product.total = parseFloat(product.price) * parseFloat(product.quantity);
      total += product.total;
    }

    values.total = total;

    try {
      console.log(values);
      await updateInvoice(invoice.documentId, values);
      console.log("updated");
      toast({
        description: "Invoice updated successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        description: "An error occurred while updating the invoice.",
        variant: "destructive",
      });
      return;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="identificationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input placeholder="INV-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "min-w-[240px] w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocussls
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customer"
            render={({ field }) => (
              <FormItem className="min-w-[280px]">
                <FormLabel>Customer</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {organizationCustomers &&
                      organizationCustomers.length > 0 &&
                      organizationCustomers.map((customer) => (
                        <SelectItem
                          value={customer.documentId}
                          key={customer.documentId}
                        >
                          {customer.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h3>Products</h3>

        {[...Array(invoice.products.length).keys()].map((index) => (
          <div key={index} className="flex gap-4">
            <FormField
              control={form.control}
              name={`products.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`products.${index}.quantity`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" placeholder="Quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`products.${index}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default function Page() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({});
  const [organizationCustomers, setOrganizationCustomers] = useState([]);

  useEffect(() => {
    getInvoice(id).then((data) => {
      setInvoice(data);
    });
  }, [id]);

  useEffect(() => {
    if (invoice.organization) {
      setOrganizationCustomers(invoice.organization.customers);
    }
  }, [invoice]);

  return invoice && organizationCustomers && organizationCustomers.length ? (
    <InvoiceForm {...{ invoice, organizationCustomers }} />
  ) : (
    <div>Loading...</div>
  );
}
