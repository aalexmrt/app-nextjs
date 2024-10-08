import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <TooltipProvider>
          <body>
            {children}
            <Toaster />
          </body>
        </TooltipProvider>
      </UserProvider>
    </html>
  );
}
