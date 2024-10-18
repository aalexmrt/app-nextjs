"use server";
import axios from "axios";

async function sendEmailAPI(email, dashboardUrl) {
  await axios.post(`${process.env.BACKEND_EXPRESS_URL}/send-email`, {
    email,
    dashboardUrl,
  });
}

export { sendEmailAPI };
