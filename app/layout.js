// app/layout.jsx
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import NavigationMenuDemo from "./ui/nav-bar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <TooltipProvider>
          <body>
            <div className="flex px-4 p-3 border-b mb-6 border-gray-200 items-baseline	">
              <div className="mr-4">
                <h5 className="text-lg font-bold">Insights</h5>
              </div>
              {/* <NavigationMenuDemo /> */}
              {/* <Avatar /> */}
            </div>
            {children}
          </body>
        </TooltipProvider>
      </UserProvider>
    </html>
  );
}
