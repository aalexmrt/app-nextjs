"use server";
import axios from "axios";
async function exportPdfAPI(dashboardUrl) {
  const response = await axios.post(
    `${process.env.BACKEND_EXPRESS_URL}/export`,
    { dashboardUrl },
    { responseType: "arraybuffer" } // Ensure the response is an ArrayBuffer for binary data
  );

  return response.data; // Return the ArrayBuffer directly
}

export { exportPdfAPI };
