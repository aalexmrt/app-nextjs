const EXPRESS_API_URL = "http://localhost:3001";
const NEXTJS_API_URL = "http://localhost:3000";

async function sendEmailAPI(email, dashboardUrl) {
  console.log(email, dashboardUrl);
  await fetch(`${EXPRESS_API_URL}/send-email`, {
    method: "POST",
    body: JSON.stringify({
      email,
      dashboardUrl: `${NEXTJS_API_URL}/${dashboardUrl}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { sendEmailAPI };
