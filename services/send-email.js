async function sendEmailAPI(email, dashboardUrl) {
  await fetch(`${process.env.BACKEND_EXPRESS_URL}/send-email`, {
    method: "POST",
    body: JSON.stringify({
      email,
      dashboardUrl,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { sendEmailAPI };
