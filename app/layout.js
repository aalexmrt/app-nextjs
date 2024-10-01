// app/layout.jsx
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <TooltipProvider>
          <body>{children}</body>
        </TooltipProvider>
      </UserProvider>
    </html>
  );
}
