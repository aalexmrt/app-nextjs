async function sendEmailAPI(email, dashboardUrl) {
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_EXPRESS_URL}/send-email`, {
    method: "POST",
    body: JSON.stringify({
      email,
      dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${dashboardUrl}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { sendEmailAPI };
