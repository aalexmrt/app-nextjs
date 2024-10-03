import { useState } from "react";
import { sendEmailAPI } from "@/services/send-email";
import { useToast } from "./use-toast";

const useSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const sendEmail = async (email, dashboardUrl) => {
    try {
      setLoading(true);
      await sendEmailAPI(email, dashboardUrl);
      toast({
        description: "Your message has been sent.",
        variant: "success",
      });
    } catch (error) {
      setError(error);
      toast({
        description: "An error occurred while sending the email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    sendEmail,
    loading,
    error,
  };
};

export { useSendEmail };
