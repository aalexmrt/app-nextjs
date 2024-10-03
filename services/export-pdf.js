async function exportPdf({ setLoading }) {
  try {
    setLoading(true);
    const response = await fetch("http://localhost:3001/export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dashboardUrl: "http://localhost:3000/hidden-dashboard",
      }),
    });

    // Get the binary data as a Blob
    const blob = await response.blob();

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element to download the PDF
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "dashboard.pdf");

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up the URL and remove the link
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

export { exportPdf };
