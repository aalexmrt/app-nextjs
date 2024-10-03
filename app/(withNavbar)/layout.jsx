"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSendEmail } from "@/hooks/use-send-email";
import { useToast } from "@/hooks/use-toast";

import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [session, setSession] = useState(null);
  const { sendEmail, loading, error } = useSendEmail();
  // useEffect(() => {
  //   const getSession = async () => {
  //     const newSession = await getSession();
  //     console.log(newSession);
  //     setSession(newSession);
  //   };
  //   getSession();
  // }, []);
  const { toast } = useToast();

  const sendEmailMutation = async () => {
    try {
      await sendEmail(
        "alexmartinez.mm98@gmail.com",
        "dashboard/hidden-dashboard"
      );
      toast({
        description: "Your message has been sent.",
        variant: "success",
      });
    } catch (error) {
      toast({
        description: "An error occurred while sending the email.",
        variant: "destructive",
      });
    }
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
          {/* <Button disabled={loading} onClick={() => exportPdf({ setLoading })}>
            Export
          </Button> */}
          <Button disabled={loading} onClick={sendEmailMutation}>
            Send
          </Button>
        </div>
      </div>
      {children}
    </>
  );
}
