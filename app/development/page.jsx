"use client";

import { Button } from "@/components/ui/button";
import invoicesDataJson from "@/mocks/invoices.json";
import addressesDataJson from "@/mocks/address.json";
import customersDataJson from "@/mocks/customers.json";
import organizationAddress from "@/mocks/organizationAddress.json";
import organization from "@/mocks/organization.json";

import {
  createMockedAddressAndCustomersService,
  createMockedAddressAndOrganizationService,
  updateOrganizationWithExistingCustomersService,
  createMockedInvoicesService,
} from "@/services/strapi";

export default function Page() {
  const { toast } = useToast();
  const createMockedInvoices = async () => {
    try{
      await createMockedInvoicesService(invoicesDataJson);
      toast({
        description: "Invoices created successfully",
        variant: "success",
      })
    } catch (error) {
      console.log(error);
    }
  };
  
  const createMockedAddressAndCustomers = async () => {
    try{
      await createMockedAddressAndCustomersService(
        addressesDataJson,
        customersDataJson
      );
      toast({
        description: "Address and customers created successfully",
        variant: "success",
      })
    } catch (error) {
      console.log(error);
    }
  };

  const createMockedAddressAndOrganization = async () => {
    try{
      await createMockedAddressAndOrganizationService(
        organizationAddress,
        organization
      );

    } catch (error) {
      console.log(error);
    }
  };

  const updateOrganizationWithExistingCustomers = async () => {
    try{
      await updateOrganizationWithExistingCustomersService();
      toast({
        description: "Organization updated successfully",
        variant: "success",
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-20 gap-6">
      <div>
        <Button variant="secondary" onClick={createMockedAddressAndCustomers}>
          1 Create mocked address and customers
        </Button>
      </div>
      <div>
        <Button
          variant="secondary"
          onClick={createMockedAddressAndOrganization}
        >
          2 Create mocked address and organization
        </Button>
      </div>
      <div>
        <Button
          variant="secondary"
          onClick={updateOrganizationWithExistingCustomers}
        >
          3 Update organization with existing customers
        </Button>
      </div>
      <div>
        <Button variant="secondary" onClick={createMockedInvoices}>
          4 Create mocked invoices
        </Button>
      </div>
    </div>
  );
}
