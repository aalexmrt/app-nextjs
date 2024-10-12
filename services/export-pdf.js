async function exportPdfAPI(dashboardUrl) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_EXPRESS_URL}/export`,
    {
      method: "POST",
      body: JSON.stringify({
        dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${dashboardUrl}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
}

export { exportPdfAPI };
