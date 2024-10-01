// app/layout.jsx
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <TooltipProvider>
          <body>
            <div className="flex px-4 p-5 border-b mb-6 border-gray-200 items-baseline justify-between">
              <h5 className="text-xl font-bold">Data Insights</h5>
              <div className="flex gap-4">
                <Button>Export</Button>
                <Button>Send</Button>
              </div>
            </div>
            {children}
          </body>
        </TooltipProvider>
      </UserProvider>
    </html>
  );
}
