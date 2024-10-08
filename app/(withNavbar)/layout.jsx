"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSendEmail } from "@/hooks/use-send-email";
import { useExportPdf } from "@/hooks/use-export-pdf";

import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [loading, setLoading] = useState(false);
  const { sendEmail, loading: sendEmailLoading } = useSendEmail();
  const { exportPdf, loading: exportLoading } = useExportPdf();
  const { user } = useUser();

  useEffect(() => {
    if (sendEmailLoading || exportLoading) {
      setLoading(true);
      return;
    }
    setLoading(false);
  }, [sendEmailLoading, exportLoading]);

  const sendEmailMutation = async () => {
    await sendEmail(user.email, "hidden-dashboard");
  };

  const exportPdfMutation = async () => {
    await exportPdf("hidden-dashboard");
  };

  return (
    <>
      <div className="flex px-4 p-5 border-b mb-6 border-gray-200 items-center justify-between">
        <h5 className="text-xl font-bold">Data Insights</h5>
        <div className="flex gap-4 align-center position-relative">
          {loading && (
            <div className="flex align-center">
              <Spinner />
            </div>
          )}
          <Button disabled={loading} onClick={exportPdfMutation}>
            Export
          </Button>
          <Button disabled={loading} onClick={sendEmailMutation}>
            Send
          </Button>
        </div>
      </div>
      <div className="px-20">{children}</div>
    </>
  );
}
