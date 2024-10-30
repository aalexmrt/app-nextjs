"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  addInvoice,
  getOrganization,
  getLastOrganizationInvoiceService,
} from "@/services/strapi";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";

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

const InvoiceForm = ({
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
      await addInvoice(values);
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
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-xl font-bold">Details</h1>
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="identificationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number</FormLabel>
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
                      initialFocus
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

        <h3 className="font-bold">Products</h3>

        {[...Array(4).keys()].map((index) => (
          <div key={index} className="flex justify-between ">
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
        <div className="flex pt-6 w-full justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
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
    <InvoiceForm
      {...{ organizationCustomers, organization, nextInvoiceNumber }}
    />
  ) : (
    <div>Loading...</div>
  );
}
