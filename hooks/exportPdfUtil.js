export const exportPdfUtil = async (dashboardUrl) => {
  const pdfArrayBuffer = await exportPdfAPI(dashboardUrl); // This must be using responseType: 'arraybuffer'

  const pdfBlob = new Blob([new Uint8Array(pdfArrayBuffer)], {
    type: "application/pdf",
  });

  return pdfBlob;
};
