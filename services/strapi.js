const getKeyMetrics = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/key-metrics`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  const dataChartData = await response.json();
  return dataChartData;
};

const getRevenueTrendChart = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/data-charts?filters[name]=Revenue Trend`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  const dataChartData = await response.json();
  return dataChartData;
};

const getActiveCustomersChart = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/data-charts?filters[name]=Active Customers`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );

  const dataChartData = await response.json();
  return dataChartData;
};

export { getRevenueTrendChart, getActiveCustomersChart, getKeyMetrics };
