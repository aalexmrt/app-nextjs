"use server";
import axios from "axios";

const strapiAPI = axios.create({
  baseURL: process.env.STRAPI_URL,
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
});

const getOrganization = async () => {
  const response = await strapiAPI.get("/organizations?populate=customers");
  const [organization] = response.data.data;
  return organization;
};

const getInvoice = async (id) => {
  console.log(id, "this is the id");
  const response = await strapiAPI.get(
    `/invoices/${id}?populate[organization][populate]=*&populate[customer][populate]=*`
  );
  console.log(response, "this is the response");
  return response.data.data;
};

const updateInvoice = async (documentId, inputData) => {
  const payload = {
    data: inputData,
  };
  const response = await strapiAPI.put(`/invoices/${documentId}`, payload, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

const getInvoicesList = async () => {
  const response = await strapiAPI.get("/invoices?populate=customer");
  return response.data;
};

const getLastOrganizationInvoiceService = async (organizationDocumentId) => {
  const response = await strapiAPI.get(
    `/invoices?populate[organization]=true&filters[organization][documentId][$eq]=${organizationDocumentId}&sort=createdAt:desc`
  );
  const [invoice] = response.data.data;
  return invoice;
};

const addInvoice = async (inputData) => {
  console.log(inputData);
  const payload = {
    data: inputData,
  };

  const response = await strapiAPI.post("/invoices", payload, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

const getOrganizationCustomers = async (organizationDocumentId) => {
  const response = await strapiAPI.get(
    `/organizations/${organizationDocumentId}?populate[customers]=true`
  );
  console.log(response.data);
  return response.data.data.customers;
};
const getKeyMetrics = async () => {
  const response = await strapiAPI.get("/key-metrics");
  return response.data;
};

const getRevenueTrendChart = async () => {
  const response = await strapiAPI.get("/data-charts", {
    params: { filters: { name: "Revenue Trend" } },
  });
  return response.data;
};

const getActiveCustomersChart = async () => {
  const response = await strapiAPI.get("/data-charts", {
    params: { filters: { name: "Active Customers" } },
  });
  return response.data;
};

const createMockedInvoicesService = async (invoices) => {
  const organizationData = await strapiAPI.get("/organizations");
  const [organization] = organizationData.data.data;
  const customersListData = await strapiAPI.get("/customers");
  const customersList = customersListData.data.data;

  console.log(organization);

  for (const invoice of invoices) {
    invoice.organization = organization.documentId;
    invoice.customer =
      customersList[
        Math.floor(Math.random() * customersList.length)
      ].documentId;
    let total = 0;
    for (const item of invoice.products) {
      total += item.total;
    }
    invoice.total = total;

    await addInvoice(invoice);
  }
};

const addAddress = async (inputData) => {
  const payload = {
    data: inputData,
  };
  const response = await strapiAPI.post("/addresses", payload, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

const addCustomer = async (inputData) => {
  const payload = {
    data: inputData,
  };
  const response = await strapiAPI.post("/customers", payload, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

const createMockedAddressAndCustomersService = async (addresses, customers) => {
  for (const [index, address] of addresses.entries()) {
    const customer = customers[index];
    const response = await addAddress(address);
    const newCustomer = { ...customer, address: response.data.documentId };
    await addCustomer(newCustomer);
  }
};

const addOrganization = async (inputData) => {
  const payload = {
    data: inputData,
  };
  const response = await strapiAPI.post("/organizations", payload, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

const createMockedAddressAndOrganizationService = async (
  addresses,
  organizations
) => {
  for (const [index, address] of addresses.entries()) {
    const response = await addAddress(address);
    const newOrganization = {
      ...organizations[index],
      address: response.data.documentId,
    };
    await addOrganization(newOrganization);
  }
};

const updateOrganizationWithExistingCustomersService = async () => {
  const organizationData = await strapiAPI.get("/organizations");
  const [organization] = organizationData.data.data;

  const customersListData = await strapiAPI.get("/customers");
  const customersList = customersListData.data.data;
  for (const customer of customersList) {
    await strapiAPI.put(
      `/organizations/${organization.documentId}`,
      {
        data: {
          customers: {
            connect: [customer.documentId],
          },
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export {
  getOrganization,
  getRevenueTrendChart,
  getActiveCustomersChart,
  getKeyMetrics,
  addInvoice,
  updateInvoice,
  getInvoicesList,
  getInvoice,
  getOrganizationCustomers,
  createMockedInvoicesService,
  createMockedAddressAndCustomersService,
  createMockedAddressAndOrganizationService,
  updateOrganizationWithExistingCustomersService,
  getLastOrganizationInvoiceService,
};
