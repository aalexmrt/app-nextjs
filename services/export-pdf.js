const EXPRESS_API_URL = "http://localhost:3001";
const NEXTJS_API_URL = "http://localhost:3000";

async function exportPdfAPI(dashboardUrl) {
  const response = await fetch(`${EXPRESS_API_URL}/export`, {
    method: "POST",
    body: JSON.stringify({
      dashboardUrl: `${NEXTJS_API_URL}/${dashboardUrl}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export { exportPdfAPI };
