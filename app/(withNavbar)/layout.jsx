import { getSession } from "@auth0/nextjs-auth0";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

import { LogOut } from "lucide-react";

export default async function Layout({ children }) {
  const session = await getSession();

  return (
    <>
      <div className="flex px-4 p-5 border-b mb-6 border-gray-200 items-center justify-between">
        <Link href="/">
          <h5 className="text-xl font-bold">Invoices</h5>
        </Link>
        <div className="flex gap-4 align-center position-relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={session?.user?.picture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-46 mr-2">
              <a href="/api/auth/logout">
                <DropdownMenuItem>
                  <LogOut className="mr-2" />

                  <span>Logout</span>
                </DropdownMenuItem>
              </a>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="px-20 pb-20">{children}</div>
    </>
  );
}
